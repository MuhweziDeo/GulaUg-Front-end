import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/__services__/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  authenticated = false;
  public image: string;
  public username: string;
  loading = true;
  authorizationSubscription: Subscription;

   constructor(private authService: AuthService) {
     this.authService.isLoggedIn();
  }

  ngOnInit() {
     this.authorizationSubscription = this.authService.authorization.subscribe(data => {
      const { image, username }: any = data;
      if (username || image ) {
        this.authenticated = true;
        this.loading = false;
      }
      this.loading = false;
    });
    // this.loading = false;
  }
  logOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }

}
