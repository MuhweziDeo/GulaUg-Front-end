import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
import { AdminConfirmationComponent } from './admin/admin-confirmation/admin-confirmation.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ConfirmEqualValidatorDirective } from './shared/validators/confirm.equal.validator.directive';
import { FooterComponent } from './shared/footer/footer.component';
import { store, IAppState } from './redux/store';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { OffersComponent } from './products/offers/offers.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { BannerComponent } from './shared/banner/banner.component';



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
    LoginComponent,
    AdminConfirmationComponent,
    ViewProfileComponent,
    LoadingComponent,
    ConfirmEqualValidatorDirective,
    FooterComponent,
    PasswordChangeComponent,
    OffersComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductListComponent,
    BannerComponent
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
    NgbModule,
    NgReduxModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA1zpxPec-LD2L8CaEmR4LVmTklgPKOzt4',
      authDomain: 'gulaug.firebaseapp.com',
      databaseURL: 'https://gulaug.firebaseio.com',
      projectId: 'gulaug',
      storageBucket: 'gulaug.appspot.com',
      messagingSenderId: '1049988843166',
      appId: '1:1049988843166:web:695f6e687540ab1b'
    }),
    AngularFireStorageModule

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

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
 }
