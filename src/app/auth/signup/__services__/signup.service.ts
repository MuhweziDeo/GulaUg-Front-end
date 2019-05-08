import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SignUpModel } from '../signup.component';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  private signUpUrl: string;
  constructor(private http: HttpClient) { }

  public signUpUser(User: SignUpModel): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    const { apiURl } = environment;
    this.signUpUrl = `${apiURl}auth/signup`;
    return this.http.post(this.signUpUrl, User, headers);

  }
}
