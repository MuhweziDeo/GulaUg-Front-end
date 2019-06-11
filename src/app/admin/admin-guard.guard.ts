import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from '../helpers/jwtHelper';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private toast: ToastrService
  ) {}
    canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot,
    ): Observable <boolean> |Promise <boolean> | boolean {
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
