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
  emailTaken = true;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toast: ToastrService,
              private activated: ActivatedRoute,
              ) { }

  ngOnInit() { }

  
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





}
