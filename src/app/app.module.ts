import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from './auth/__services__/auth.service';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { SocialAuthenticationComponent } from './auth/social-authentication/social-authentication.component';
import { provideConfig } from './auth/social-authentication/social-authentication.config';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingPageComponent,
    NavigationBarComponent,
    HeaderComponent,
    SignupComponent,
    EmailConfirmationComponent,
    SocialAuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule


  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
