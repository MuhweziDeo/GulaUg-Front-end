import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { SignUpModel } from '../signup/signup.component';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private signUpUrl: string;
  private baseURL: string;
  public authorization = new  Subject();
  headers = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
  constructor(private http: HttpClient) {
    const { apiURl } = environment;
    this.baseURL = apiURl;
  }

  authorizeUser(data: object): void {
    return this.authorization.next(data);
  }

  public signUpUser(User: SignUpModel): Observable<any> {
    this.signUpUrl = `${this.baseURL}auth/signup`;
    return this.http.post(this.signUpUrl, User, this.headers);
  }

  public verifyUser(token: string): Observable<any> {
    return this.http.put(`${this.baseURL}auth/verify/${token}/`, this.headers);
  }
}
