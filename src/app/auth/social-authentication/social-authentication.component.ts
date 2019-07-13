import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService as AuthenticationService } from '../__services__/auth.service';
import { AppEventService } from '../../shared/__services__/app-events.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../redux/store';

@Component({
  selector: 'app-social-authentication',
  templateUrl: './social-authentication.component.html',
  styleUrls: ['./social-authentication.component.scss']
})
export class SocialAuthenticationComponent implements OnInit {
  loading: boolean;
  constructor(
    private socialAuthService: AuthService,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastrService,
    private appEventService: AppEventService,
    private store: NgRedux<IAppState>,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() { }

  activateSocialSign(data: any, platform: string) {
    this.authService.socialLogin(platform, {
      access_token: data.authToken
    }).subscribe(res => {
      this.loading = false;
      const { image, isAdmin, username} = res;
      this.store.dispatch({
        type: 'Auth-Success',
        payload: { username, isAdmin, image}
      });
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
      this.toast.success(`Login Successful ${data.firstName}`, '', {
        positionClass: 'toast-top-center'
      });
      if (res.isAdmin) {
        return this.router.navigate(['admin']);
       }
      this.router.navigate(['/']);
      }, error => {
        this.toast.error(error.error.message);
        this.loading = false;
        return;
      }
    );
  }
  signInWithGoogle(): void {
    this.loading = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        return this.activateSocialSign(data, 'google');
      }
    ).catch(error => {
      this.loading = false;
      this.toast.error(error);
      return;
    });
  }
  signInWithFB(): void {
    this.loading = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        return this.activateSocialSign(data, 'facebook');
      }
    ).catch(error => {
      this.loading = false;
      this.toast.error(error);
      return;
    });
  }

  signInWithTwitter() {
    return new Promise((resolve, reject) => {
      this.loading = true;
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
          // @ts-ignore
          const {credential: { accessToken, secret}, user: {photoURL}} = res;
          this.authService.socialLogin('twitter',
            {oauth_token: accessToken, oauth_token_secret: secret })
            .subscribe(resp => {
              this.loading = false;
              const { image, isAdmin, username, success, token} = resp;
              if (success) {
                this.store.dispatch({
                  type: 'Auth-Success',
                  payload: { username, isAdmin, image}
                });
                localStorage.setItem('token', token);
                this.toast.success(`Login Successful ${username}`, '', {
                  positionClass: 'toast-top-center'
                });
                if (isAdmin) {
                  return this.router.navigate(['admin']);
                }
                return this.router.navigate(['/']);
              }
            }, error => {
              this.loading = false;
              this.toast.error(error.error.message);
            });
        })
        .catch(e => {
          this.loading = false;
          this.toast.error(e.error.message);
          reject(e);
        });
    });
  }

}
