import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddAdminService implements OnInit {
  baseURl: string;
  constructor(
    private http: HttpClient
  ) {
    const {apiURl} = environment;
    this.baseURl = `${apiURl}`;
  }

  ngOnInit() { }

  createAdmin(email: string): Observable<any> {
    return this.http.post(`${this.baseURl}/admin/add`, { email });
  }
}
