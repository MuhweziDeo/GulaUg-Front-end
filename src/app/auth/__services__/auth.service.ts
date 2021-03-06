import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { SignUpModel } from '../signup/signup.component';
import { Observable, Subject } from 'rxjs';
import { AppEventService } from '../../shared/__services__/app-events.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';

export interface LoginModel {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private signUpUrl: string;
  private baseURL: string;
  public authorization: Subject<any> = new  Subject();
  headers = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient,
              private appEventService: AppEventService,
              private store: NgRedux<IAppState>
    ) {
    const { apiURl } = environment;
    this.baseURL = apiURl;
  }

  authorizeUser(data: object): void {
    return this.authorization.next(data);
  }

  public signUpUser(User: SignUpModel): Observable<any> {
    this.signUpUrl = `${this.baseURL}/signup`;
    return this.http.post(this.signUpUrl, User, this.headers);
  }

  public verifyUser(token: string): Observable<any> {
    return this.http.put(`${this.baseURL}/verify/${token}/`, this.headers);
  }

  public loginUser(User: LoginModel): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, User, this.headers);
  }

  public socialLogin(platformName: string, tokens: any): Observable<any> {
    return this.http.post(`${this.baseURL}/${platformName}`, tokens, this.headers);
  }

  public isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) { return this.authorizeUser({}); }
    const newHeaders =  {
      headers: new HttpHeaders({
        Authorization:  token,
      })
    };
    return this.http.get<any>(`${this.baseURL}/user/`, newHeaders).subscribe(res => {
      if (res.data) {
        this.store.dispatch({
          type: 'Auth-Success',
          payload : {
            username: res.data.User.username,
            image: res.data.image,
            isAdmin: res.data.User.isAdmin
          }
        });
      }
      return this.authorizeUser({});
    });
  }

  public verifyToken() {
    return this.http.get<any>(`${this.baseURL}/user/`);
  }


}
