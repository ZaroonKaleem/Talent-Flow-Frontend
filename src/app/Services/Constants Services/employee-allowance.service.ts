import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAllowanceService {
 private apiUrl = `${environment.apiUrl}services/app/Allowance`;

  constructor(private http: HttpClient) { }

  /**
   * Get all allowances with optional filtering and pagination
   * @param params Filter and pagination parameters
   * @returns Observable of any
   */
  getAllAllowances(params?: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Convert params object to HttpParams
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}/GetAll`, {
      headers,
      params: httpParams
    });
  }
}
