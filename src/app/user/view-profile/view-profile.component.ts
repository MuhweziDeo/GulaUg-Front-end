import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { IProfile } from '../../shared/models/users.model';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from '../../helpers/jwtHelper';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  username: string;
  user: IProfile;
  currentUser: IProfile;
  loading: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    this.username = params.username;
  });
  this.fetchUserProfile();
  this.currentUser = JwtHelper.getUser();
  }

  fetchUserProfile() {
    this.loading = true;
    return this.profileService.fetchProfile(this.username).subscribe(res => {
      if (res.success) {
        this.loading = false;
        this.user = res.profileData;
      }
    }, error => {
      this.loading = false;
      return this.toast.error(error.error.message || 'Unable to get Profile');
    } );
  }

  activateDeActivateAccount(event) {
    this.loading = true;
    const obj = {
      activateStatus: event.checked,
      userId: this.user.User.id
    };
    this.profileService.activateOrDeactivateAccount(obj).subscribe(res => {
      const { success, message } = res;
      if (success) {
        this.loading = false;
        this.toast.info(message);
        this.fetchUserProfile();
        return;
      }
    }, error => {
      this.loading = false;
      return this.toast.error(error.error.message || 'unable to fetch data');
    });
  }

}
