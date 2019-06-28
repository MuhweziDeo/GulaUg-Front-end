import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PasswordChangeService } from './password-change.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  loading: boolean;
  constructor(
    private passwordService: PasswordChangeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  updatePassword(form: NgForm) {
    this.loading = true;
    const { value } = form;
    this.passwordService.changePassword(value).subscribe(res => {
      if (res.success) {
        this.loading = false;
        this.toastr.success(res.message);
        this.toastr.info('Kindly use new password on next Login');
        return form.reset();
      }
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message);
    });
  }

}
