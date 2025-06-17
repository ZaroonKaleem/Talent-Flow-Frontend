import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResignationService {
  // private apiUrl = '';
    private apiUrl = `${environment.apiUrl}services/app/EmployeeResignation`;

  constructor(private http: HttpClient) { }

  getAllResignations(params?: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
    'Accept': 'text/plain' // <- this matches Swagger

});

    return this.http.get(`${this.apiUrl}/GetAll`, {
      headers,
      params
       });
  }
}
