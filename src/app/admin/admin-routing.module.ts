import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './admin-guard.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {path: '', component: AdminComponent,
   canActivate: [AdminGuard],
    children: [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage-users', component: ManageUsersComponent}
  ],
  } ,
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
