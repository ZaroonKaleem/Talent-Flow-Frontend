import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGroupService {
  private apiUrl = `${environment.apiUrl}services/app/EmployeeGroup`;

  constructor(private http: HttpClient) { }

  /**
   * Get all employee groups with optional filtering and pagination
   * @param params Filter and pagination parameters
   * @returns Observable of any
   */
  getAllEmployeeGroups(params?: any): Observable<any> {
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

  /**
   * Create a new employee group
   * @param employeeGroup Data for the new employee group
   * @returns Observable of the created employee group
   */
  createEmployeeGroup(employeeGroup: { id: number; name: string }): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/Create`, employeeGroup, { headers });
  }

   /**
   * Delete an employee group by ID
   * @param id The ID of the employee group to delete
   * @returns Observable of any
   */
  deleteEmployeeGroup(id: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Create query parameter for the ID
    const params = new HttpParams().set('Id', id.toString());

    return this.http.delete<any>(`${this.apiUrl}/Delete`, {
      headers,
      params
    });
  }
}