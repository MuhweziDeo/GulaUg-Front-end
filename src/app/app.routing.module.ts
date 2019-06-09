import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PasswordResetRequestComponent } from './auth/password-reset/password-reset-request/password-reset-request.component';
import { PasswordResetConfirmComponent } from './auth/password-reset/password-reset-confirm/password-reset-confirm.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '' , component: LandingPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'auth/verify/:token', component: EmailConfirmationComponent},
  {path: 'profile', component: ProfileComponent,
  canActivate: [AuthGuardService]},
  { path: 'password-reset', component: PasswordResetRequestComponent },
  {path: 'auth/password-reset/:token/confirm', component: PasswordResetConfirmComponent },
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
