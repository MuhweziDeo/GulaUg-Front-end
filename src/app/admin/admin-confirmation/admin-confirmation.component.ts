import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminConfirmationService } from './admin-confirmation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppEventService } from '../../shared/__services__/app-events.service';
import { IAppState } from '../../redux/store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-admin-confirmation',
  templateUrl: './admin-confirmation.component.html',
  styleUrls: ['./admin-confirmation.component.scss']
})
export class AdminConfirmationComponent implements OnInit {
  token: string;
  loading: boolean;
  constructor(
    private adminService: AdminConfirmationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private store: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
     this.token = params.token;
    });
  }

  handleConfirmation(form: NgForm) {
      const data = form.value;
      this.loading = true;
      this.adminService.confirmAdminUser(data, this.token).subscribe(res => {
          if (res.success) {
            const {username, image, isAdmin} = res;
            this.store.dispatch({
              type: 'Auth-Success',
              payload: { username, image, isAdmin }
            });
            localStorage.setItem('token', res.access_token);
            form.reset();
            this.loading = false;
            this.toast.success(res.message);
            this.toast.info('Kindly Login with Admin account');
            this.router.navigate(['login']);
            return;
          }
      }, error => {
        this.loading = false;
        this.toast.error(error.error.message);
        return;
      });
  }

}
