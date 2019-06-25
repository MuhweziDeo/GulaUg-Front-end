import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileUrl: string;
  constructor(
    private http: HttpClient
  ) {
    const {apiURl} = environment;
    this.profileUrl = `${apiURl}api/v1/`;
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.profileUrl}user`);
  }
  updateProfile(username: string, data: object): Observable<any> {
    return this.http.put(`${this.profileUrl}profile/${username}`, data);
  }

  fetchProfile(username: string): Observable<any> {
    return this.http.get(`${environment.apiURl}api/v1/profile/${username}`);
  }

  activateOrDeactivateAccount(activationObject: IAccountActivationObject): Observable<any> {
    return this.http.put(`${environment.apiURl}api/v1/admin/user/activation`, activationObject);
  }
}

export interface IAccountActivationObject {
  userId: number;
  activateStatus: boolean;

}
