import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/__services__/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  authenticated = false;
  loading = false;
  AuthSubscription: Subscription;
  constructor(
    public authService: AuthService
  ) { this.authService.isLoggedIn(); }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { return this.loading = false; }
    this.loading = true;
    this.AuthSubscription = this.authService.authorization.subscribe(data => {
      const {username: username} = data;
      if (username) {
        this.loading = false;
        this.authenticated = true;
      }
    });
  }

}
