import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { IProfile } from '../../shared/models/users.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  siteUsers: IProfile[];
  loading: boolean;
  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.dashboardService.fetchUsers().subscribe(res => {
      const {success, data } = res;
      if (success && data.length > 1) {
          this.loading = false;
          this.siteUsers = data.filter(user => user.User.isAdmin === false);
      }

    }, () => {
      this.loading = false;
    });
  }

}
