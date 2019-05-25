import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordResetService } from '../password-reset.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {
  loading = false;

  constructor(
    private toastr: ToastrService,
    private passwordResetService: PasswordResetService
  ) { }

  ngOnInit() { }

  passwordResetRequest(form: NgForm) {
    const { email } = form.value;
    this.loading = true;
    this.passwordResetService.sendPasswordResetLink({email}).subscribe(res => {
      this.loading = false;
      if(res.success) {
        this.toastr.success(res.message);
        form.reset();
      }
    },error => {
    this.loading = false
    this.toastr.error(error.error.message || 'Something went wrong Please Try Again')});
  }

}
