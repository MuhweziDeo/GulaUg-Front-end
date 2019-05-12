import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../__services__/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {
  token: string;
  paramsSubscription: Subscription;
  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
  this.paramsSubscription = this.route.params.subscribe(params => {
    this.token = params.token;
    this.activateUser(this.token);
  });
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  activateUser(token: string): any {
    try {
      this.authService.verifyUser(token).subscribe(response => {
        console.log(response);
        this.toastrService.success(response.message);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('image', response.image)
        this.router.navigate(['']);
        this.authService.authorizeUser({username: response.data.username, image: response.image});
      }, error => {
        this.toastrService.error(`${error.error.message}, Please Try Again Later`);
        this.router.navigate(['']);

      } );
    } catch (e) {
      this.toastrService.error('Unable to Activate Account');
      this.router.navigate(['']);
    }

  }

}
