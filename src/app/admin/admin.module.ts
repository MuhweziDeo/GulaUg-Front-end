import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgbModule
  ]
})
export class AdminModule { }
