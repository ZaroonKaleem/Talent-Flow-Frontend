import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { Employee, EmployeeListResponse } from '../Components/employee-dashboard/employee-list/employee-list.component'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}services/app/Employee`;

  constructor(private http: HttpClient) { }

  /**
   * Get all employees with optional filtering and pagination
   * @param params Filter and pagination parameters
   * @returns Observable of EmployeeListResponse
   */
  getAllEmployees(params?: any): Observable<EmployeeListResponse> {
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

    return this.http.get<EmployeeListResponse>(`${this.apiUrl}/GetAll`, {
      headers,
      params: httpParams
    });
  }
  /** 
 * Get all delegation requests with optional filtering and pagination 
 * @param params Filter and pagination parameters 
 * @returns Observable of any (response) 
 */
  getAllDelegationRequests(params?: any): Observable<any> {
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

    return this.http.get<any>(`${environment.apiUrl}services/app/DelegationRequest/GetAll`, {
      headers,
      params: httpParams
    });
  }

  /**
   * Get a single employee by ID
   * @param id Employee ID
   * @returns Observable of Employee
   */
  getEmployeeById(id: number): Observable<Employee> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Employee>(`${this.apiUrl}/Get`, {
      headers,
      params: { Id: id.toString() }
    });
  }

  /**
   * Update an employee
   * @param id Employee ID
   * @param employeeData Updated employee data
   * @returns Observable of the updated Employee
   */
  updateEmployee(id: number, formData: FormData): Observable<Employee> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // Remove Content-Type - browser will set it with boundary
    });

    formData.append('Id', id.toString());

    return this.http.put<Employee>(`${this.apiUrl}/Update`, formData, {
      headers
    });
  }

  /**
   * Create a new employee
   * @param employeeData New employee data
   * @returns Observable of the created Employee
   */
  createEmployee(employeeData: Partial<Employee>): Observable<Employee> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Employee>(`${this.apiUrl}/Create`, employeeData, { headers });
  }

  /**
   * Delete an employee
   * @param id Employee ID
   * @returns Observable of any (response)
   */
  deleteEmployee(id: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/Delete`, {
      headers,
      params: { Id: id.toString() }
    });
  }

  /**
   * Toggle employee active status
   * @param id Employee ID
   * @param isActive New status
   * @returns Observable of any (response)
   */
  toggleEmployeeStatus(id: number, isActive: boolean): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/ToggleStatus`, {
      id,
      isActive
    }, { headers });
  }
}