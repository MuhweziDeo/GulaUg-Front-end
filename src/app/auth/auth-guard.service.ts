import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './__services__/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot,
    ): Observable <boolean> |Promise <boolean> | boolean {
    const token = localStorage.getItem('token');
    if (!token) { return this.router.navigate(['login']); }
    return true;
   }

}
