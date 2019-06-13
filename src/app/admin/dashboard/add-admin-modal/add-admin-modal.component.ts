import { Component, OnInit, ViewChild } from '@angular/core';
import { AddAdminService } from './add-admin.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import { AppEventService } from '../../../shared/__services__/app-events.service';

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss']
})
export class AddAdminModalComponent implements OnInit {
  @ViewChild('addAdminModal') public addAdminModal: ModalDirective;
  loading: boolean;
  constructor(
    private adminService: AddAdminService,
    private toast: ToastrService,
    private appEventService: AppEventService
   ) { }

  ngOnInit() {}

  handleSubmit(form: NgForm) {
    this.loading = true;
    const { email } = form.value;
    this.adminService.createAdmin(email).subscribe(res => {
        const { success, message } = res;
        if (success) {
          this.appEventService.broadcast({
            name: 'adminAdded',
          });
          this.loading = false;
          this.toast.success(message);
          form.reset();
          this.addAdminModal.hide();
          return;
        }
    }, error => {
      this.loading = false;
      this.toast.info(error.error.message || 'Something went wrong');
      return;
    });
  }

}
