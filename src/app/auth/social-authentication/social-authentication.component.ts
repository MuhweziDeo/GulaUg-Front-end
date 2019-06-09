import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService as AuthenticationService } from '../__services__/auth.service';


@Component({
  selector: 'app-social-authentication',
  templateUrl: './social-authentication.component.html',
  styleUrls: ['./social-authentication.component.scss']
})
export class SocialAuthenticationComponent implements OnInit {

  constructor(
    private socialAuthService: AuthService,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit() { }

  activateSocialSign(data: any, platform: string) {
    this.authService.authorizeUser({
      username: data.firstName,
      image: data.photoUrl,
    });
    this.authService.socialLogin(platform, {
      access_token: data.authToken
    }).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.toast.success(`Login Successful ${data.firstName}`, '', {
        positionClass: 'toast-top-center'
      });
      if (res.isAdmin) {
        return this.router.navigate(['admin/dashboard']);
       }
      this.router.navigate(['/']);
      }
    );
  }
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        return this.activateSocialSign(data, 'google');
      }
    ).catch(error => this.toast.error(error));
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        return this.activateSocialSign(data, 'facebook');
      }
    ).catch(error => this.toast.error(error));
  }

}
