import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AuthService } from './auth/__services__/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gulaUg-frontend';
  constructor(
    private store: NgRedux<any>,
    private authService: AuthService
    ) {
    this.authService.verifyToken().subscribe(res => {
        if (res.success) {
          const { data: { image, User: { isAdmin, username } } } = res;
          this.store.dispatch({
            type: 'Auth-Success',
            payload: { username, isAdmin, image}
          });
        }
      }, (error) => {
        this.store.dispatch({
        type: 'Auth-Failure',
        });
      });
  }
}
