import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/__services__/auth.service';
import { Subscription } from 'rxjs';
import { AppEventService } from '../__services__/app-events.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  authenticated = false;
  public image: string;
  public username: string;
  loading = false;
  isAdmin = false;
  authorizationSubscription: Subscription;

   constructor(
    private authService: AuthService,
    private appEventService: AppEventService
   ) { }

  ngOnInit() {
    this.loginUser();
    this.appEventService.subscribe('LoginSuccess', (data) => {
      this.authenticated = true;
      this.isAdmin = data.content.isAdmin;
      this.image = data.content.image;
      this.username = data.content.username;
    });
  }

  loginUser() {
    if (!localStorage.getItem('token')) {return; }
    this.loading = true;
    return this.authService.verifyToken().subscribe(res => {
      if (res.success) {
        this.loading = false;
        this.authenticated = true;
        this.isAdmin = res.data.User.isAdmin;
        this.image = res.data.image;
        this.username = res.data.User.username;
      }
    }, error => {
      this.loading = false;
      this.authenticated = false; });
  }
  logOut() {
    localStorage.removeItem('token');
    this.authenticated = false;
  }

}
