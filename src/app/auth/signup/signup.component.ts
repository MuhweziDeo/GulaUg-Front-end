import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService} from '../__services__/auth.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
  emailTaken = false;
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.showSignup = false;
  }

  toggle() {
    this.showSignup = !this.showSignup;
  }

   onSubmitSignUp(form) {
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
      this.toastr.success(res.message);
      form.reset();
      this.loading = false;
      this.router.navigate(['/']);
    }, error => {
      this.loading = false;
      this.toastr.error(error.error.message); });
  }

}
