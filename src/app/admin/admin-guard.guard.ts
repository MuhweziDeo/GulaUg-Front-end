import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from '../helpers/jwtHelper';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private store: NgRedux<IAppState>
  ) { }
    canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot,
    ): Observable <boolean> |Promise <boolean> | boolean {
    if (this.store.getState().user.username) {
      if (this.store.getState().user.isAdmin) {
        return true;
      }
      return false;
    }
    const token = localStorage.getItem('token');
    if (!token) { return this.router.navigate(['login']); }
    const isAdmin = JwtHelper.checkIfAdmin();
    if (!isAdmin) {
      this.toast.info('Whoops Did You Get Lost !! UnAuthorized Access');
      this.router.navigate(['']);
      return false;
    }
    return true;

   }
   canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean> |Promise <boolean> | boolean {
    return this.canActivate(route, state);
  }
}
