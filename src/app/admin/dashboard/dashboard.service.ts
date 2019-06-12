import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = `${environment.apiURl}admin/users`;
  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
