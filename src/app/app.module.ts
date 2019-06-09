import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/__services__/auth.service';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { SocialAuthenticationComponent } from './auth/social-authentication/social-authentication.component';
import { provideConfig } from './auth/social-authentication/social-authentication.config';
import { ProfileComponent } from './user/profile/profile.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { PasswordResetRequestComponent } from './auth/password-reset/password-reset-request/password-reset-request.component';
import { PasswordResetConfirmComponent } from './auth/password-reset/password-reset-confirm/password-reset-confirm.component';
import { LoginComponent } from './auth/login/login.component';
import { AppEventService } from './shared/__services__/app-events.service';






@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingPageComponent,
    NavigationBarComponent,
    HeaderComponent,
    SignupComponent,
    EmailConfirmationComponent,
    SocialAuthenticationComponent,
    ProfileComponent,
    PasswordResetRequestComponent,
    PasswordResetConfirmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    NgbModule

  ],
  providers: [
    AppEventService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
