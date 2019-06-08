import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  email: string;
  image: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  loading: boolean;

  constructor(
    private profileService: ProfileService,
    private toast: ToastrService ) {}

  fetchProfile(): void {
    this.profileService.getUserProfile().subscribe(res => {
      this.email = res.data.User.email;
      this.username = res.data.User.username;
      this.firstName = res.data.firstName;
      this.lastName = res.data.lastName;
      this.city = res.data.city;
      this.image = res.data.image;
      this.country = res.data.country;
    });
  }
  ngOnInit() {
   this.fetchProfile();
  }

  updateProfile(form: NgForm) {
    this.loading = true;
    this.profileService.updateProfile(this.username, form.value).subscribe(
      res => {
        this.loading = false;
        if (res.success) {
          this.toast.success(res.message);
        }
      }, error => this.toast.error(error.error.message)
    );
  }


}
