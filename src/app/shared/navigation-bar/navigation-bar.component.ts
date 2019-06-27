import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/__services__/auth.service';
import { Subscription } from 'rxjs';
import { AppEventService } from '../__services__/app-events.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';


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
    private appEventService: AppEventService,
    private store: NgRedux<IAppState>
   ) { }

  ngOnInit() {
      this.loading = true;
      this.store.subscribe(() => {
        const { isAuthenticated, username, isAdmin, image } = this.store.getState().user;
        this.loading = false;
        this.authenticated = isAuthenticated;
        this.isAdmin = isAdmin;
        this.image = image;
        this.username = username;
      });
  }
  logOut() {
    localStorage.removeItem('token');
    this.authenticated = false;
  }

}
