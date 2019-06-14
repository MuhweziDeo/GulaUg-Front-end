import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAdminModalComponent } from './dashboard/add-admin-modal/add-admin-modal.component';
import { FormsModule } from '@angular/forms';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent,
     AddAdminModalComponent, ManageUsersComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    FormsModule
  ],
  entryComponents: [AddAdminModalComponent]
})
export class AdminModule { }
