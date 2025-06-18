import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCustomerService {
private apiUrl = `${environment.apiUrl}services/app/ClientCustomer`;

  constructor(private http: HttpClient) { }

  /**
   * Get all employee stations with optional filtering and pagination
   * @param params Filter and pagination parameters
   * @returns Observable of any
   */
  getAllEmployeeStations(params?: any): Observable<any> {
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
