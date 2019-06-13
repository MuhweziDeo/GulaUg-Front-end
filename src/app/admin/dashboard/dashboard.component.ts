import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { IProfile } from '../../shared/models/users.model';
import { AppEventService } from '../../shared/__services__/app-events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toggle: true;
  adminUsers: IProfile[] = [];
  adminUsersCount: number;
  allUsersCount: number;
  activeUsersCount: number;
  newNonAdminUsers: IProfile[] = [];
  constructor(
    private dashboardService: DashboardService,
    private appEventService: AppEventService,
  ) { }

  ngOnInit() {
    this.fetchUsers();
    this.appEventService.subscribe('adminAdded', () => this.fetchUsers());
  }

  fetchUsers() {
    this.dashboardService.fetchUsers().subscribe(res => {
      const { success, data } = res;
      if (success) {
        this.allUsersCount = data.length;
        this.newNonAdminUsers = data.filter(user => user.User.isAdmin === false);
        this.activeUsersCount = data.filter(user => user.User.active === true).length;
        this.adminUsersCount = data.filter(user => user.User.isAdmin === true ).length;
        this.adminUsers = data.filter(user => user.User.isAdmin === true ).splice(0, 10);
      }
    });
  }

}
