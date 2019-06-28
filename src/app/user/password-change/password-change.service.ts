import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  constructor(
    private http: HttpClient
  ) { }

  changePassword(data: IchangePassword): Observable<any> {
    return this.http.put(`${environment.apiURl}/password-change`, data);
  }
}

export interface IchangePassword {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}
