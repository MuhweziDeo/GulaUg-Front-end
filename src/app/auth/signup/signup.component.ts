import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService as AuthenticationService } from '../__services__/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


export interface SignUpModel {
  username: string;
  password: string;
  email: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showSignup: boolean;
  passwordMatch = false;
  loading = false;
  usernameTaken = false;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toast: ToastrService,
              private activated: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.showSignup = false;
    this.activated.queryParams.subscribe(qParams => {
      if (qParams.page === 'signup') {
       this.toggle();
      }
    });

  }

  toggle() {
    this.showSignup = !this.showSignup;
  }

   onSubmitSignUp(form: NgForm) {
    this.loading = true;
    this.passwordMatch = false;
    const {  password, confirm, username, email} = form.value;
    const data = {
      username,
      password,
      email
    };
    if (password !== confirm) {
      this.loading = false;
      setTimeout(() => {
        this.passwordMatch = false;
      }, 3000);
      return this.passwordMatch = true;
    }
    this.authService.signUpUser(data).subscribe(res => {
      this.toast.success(res.message);
      form.reset();
      this.loading = false;
      this.router.navigate(['/']);
    }, error => {
      this.loading = false;
      this.toast.error(error.error.message); });
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
