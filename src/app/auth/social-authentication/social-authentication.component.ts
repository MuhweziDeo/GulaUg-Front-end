import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService as AuthenticationService } from '../__services__/auth.service';
import { AppEventService } from '../../shared/__services__/app-events.service';


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
    private appEventService: AppEventService
  ) { }

  ngOnInit() { }

  activateSocialSign(data: any, platform: string) {
    this.authService.socialLogin(platform, {
      access_token: data.authToken
    }).subscribe(res => {
      this.loading = false;
      this.appEventService.broadcast({
        name: 'LoginSuccess',
        content: {
          image: res.image,
          isAdmin: res.isAdmin,
          username: res.username
        }
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

}
