import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

const routes: Routes = [
  {path: 'home' , component: LandingPageComponent},
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
