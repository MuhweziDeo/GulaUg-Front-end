import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminConfirmationService {
  baseUrl: string;
  constructor(
    private http: HttpClient
  ) {
    const { apiURl } = environment;
    this.baseUrl = apiURl;
   }

   confirmAdminUser(adminObject: IadminConfirm, token: string): Observable<any> {
     return this.http.put(`${this.baseUrl}admin/verify/${token}/confirm`, adminObject);
   }
}

export interface IadminConfirm {
  username: string;
  password: string;
  confirmPassword: string;
}
