import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {path: '' , component: LandingPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'auth/verify/:token', component: EmailConfirmationComponent},
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
