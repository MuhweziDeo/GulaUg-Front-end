import { Component, OnInit } from '@angular/core';
import { AuthService } from '../__services__/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppEventService } from '../../shared/__services__/app-events.service';
import { NgRedux } from '@angular-redux/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private appEventService: AppEventService,
    private store: NgRedux<any>
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(form: NgForm) {
    this.loading = true;
    const { value: { email, password } } = form;
    const data = { email, password };
    this.authService.loginUser(data).subscribe(res => {
      this.loading = false;
      const { accessToken, data: { username, isAdmin }, success} = res;
      this.store.dispatch({
        type: 'Auth-Success',
        payload: {username}
      });
      if (success) {
        form.reset();
        // this.appEventService.broadcast({
        //   name: 'LoginSuccess',
        //   content: {
        //   username,
        //   isAdmin
        //   } });
        this.store.dispatch({
          type: 'Auth-Success',
          payload: {username, isAdmin, isAuthenticated: true}
        });
        this.toast.success('login success');
        localStorage.setItem('token', accessToken);
        localStorage.setItem('username', username);
        this.authService.authorizeUser({ username });
        if (isAdmin) {
         return this.router.navigate(['admin']);
        }
        return this.router.navigate(['']);
      }
    }, error => {
      this.loading = false;
      this.toast.error(error.error.message);
    });
  }

}
