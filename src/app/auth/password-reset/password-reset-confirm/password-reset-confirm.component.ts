import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../password-reset.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {
  token: string;
  loading: boolean;
  passwordError: boolean;
  constructor(
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params.token
    })
  }
  resetPassword(password, confirm) {
    this.loading = true;
      if(password.value !== confirm.value){
        this.loading = false;
        setTimeout(()=>{
          this.passwordError = false;
        },2000)
        this.passwordError = true;
        return;
      }
      this.passwordResetService.passwordResetConfirmation({
        password: password.value,
        confirmPassword: confirm.value
      },this.token).subscribe(res => {
        this.loading = false;
        if(res.success){
          localStorage.setItem('token', res.accessToken);
          this.toastr.success(res.message);
          this.router.navigate(['/'])
        }
      },error => {
        this.loading = false;
        this.toastr.error(error.error.message);
      })
    

  }

}
