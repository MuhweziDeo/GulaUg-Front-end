import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile/profile.service';
import { IProfile } from '../../shared/models/users.model';
import { JwtHelper } from '../../helpers/jwtHelper';
import {AppEventService} from '../../shared/__services__/app-events.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  username: string;
  user: IProfile;
  currentUser;
  loading: boolean;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress$: Observable<number>;
  downloadURL$: Observable<string>;
  profileImage: string;
  showUploadProgress: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private toast: ToastrService,
    private afStorage: AngularFireStorage,
    private appEvents: AppEventService,
  ) { }

  ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    this.username = params.username;
  });

  this.showUploadProgress = false;
  this.fetchUserProfile();

  if (localStorage.getItem('token')) {
    return this.currentUser = JwtHelper.getUser();
  }
  this.currentUser = {
    username : '',
    isAdmin: ''
  };
  }

  fetchUserProfile() {
    this.loading = true;
    return this.profileService.fetchProfile(this.username).subscribe(res => {
      if (res.success && res.profileData) {
        this.loading = false;
        this.user = res.profileData;
        this.profileImage = this.user.image;
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

   upload(event) {
    const file = event.target.files[0];
    if (file.size > 1000000) {
      return this.toast.info('Please use an image less than 1mb');
    }
    this.showUploadProgress = true;
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task =  this.ref.put(file);
    this.uploadProgress$ = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL$ =  this.ref.getDownloadURL();
        this.downloadURL$.subscribe(url => {
          this.profileImage = url;
          this.profileService.updateProfile(this.username, {image: this.profileImage}).subscribe(
            res => {
              if (res.success) {
                this.toast.success('Profile updated successfully');
                this.appEvents.broadcast({
                  name: 'profileUpdated',
                  content: {image: this.profileImage}
                });
              }
            }
          );
        });
      })
    ).subscribe();
    this.uploadProgress$.subscribe(val => {
       if (val === 100) {
         this.showUploadProgress = false;
       }
     },
      () => this.toast.error('Unable to upload image')
    );
  }

}
