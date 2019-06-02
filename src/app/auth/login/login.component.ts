import { Component, OnInit } from '@angular/core';
import { AuthService } from '../__services__/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(form: NgForm) {
    this.loading = true;
    const { value: { email, password } } = form;
    const data = { email, password };
    this.authService.loginUser(data).subscribe(res => {
      this.loading = false;
      const { accessToken, data: { username }, success} = res;
      if (success) {
        form.reset();
        this.toast.success('login success');
        localStorage.setItem('token', accessToken);
        localStorage.setItem('username', username);
        this.authService.authorizeUser({ username });
        this.router.navigate(['']);
      }
    }, error => {
      this.loading = false;
      this.toast.error(error.error.message);
    });
  }

}
