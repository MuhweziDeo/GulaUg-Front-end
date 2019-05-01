import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingPageComponent,
    NavigationBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
