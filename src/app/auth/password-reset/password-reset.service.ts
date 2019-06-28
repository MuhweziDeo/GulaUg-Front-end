import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  passwordResetURL: string;
  constructor(
    private http: HttpClient
      ) {
    const {apiURl} = environment;
    this.passwordResetURL = `${apiURl}/password-reset`;
   }
  sendPasswordResetLink(data: object): Observable<any> {
    return this.http.post(this.passwordResetURL, data);
  }
  passwordResetConfirmation(data: object, token): Observable<any> {
    return this.http.put(`${this.passwordResetURL}/${token}/confirm`, data);
  }
}
