import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
    private apiUrl = `${environment.apiUrl}services/app`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private createParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return httpParams;
  }

  // Announcement Endpoints
  getAllAnnouncements(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Announcement/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Area Endpoints
  getAllAreas(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Area/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // BankBranch Endpoints
  getAllBankBranches(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/BankBranch/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // City Endpoints
  getAllCities(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/City/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // DayClose Endpoints
  getAllDayCloses(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/DayClose/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Department Endpoints
  getAllDepartments(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Department/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // EmployeeStation Endpoints
  getAllEmployeeStations(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/EmployeeStation/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // GazettedHoliday Endpoints
  getAllGazettedHolidays(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/GazettedHoliday/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // MinimumWage Endpoints
  getAllMinimumWages(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/MinimumWage/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Project Endpoints
  getAllProjects(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Project/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Province Endpoints
  getAllProvinces(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Province/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // SubDepartment Endpoints
  getAllSubDepartments(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/SubDepartment/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Task Endpoints
  getAllTasks(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Task/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // Vendor Endpoints
  getAllVendors(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Vendor/GetAll`, {
      headers: this.getHeaders(),
      params: this.createParams(params)
    });
  }

  // CRUD operations for each endpoint can be added similarly
  // Example for Announcement:
  getAnnouncementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Announcement/Get`, {
      headers: this.getHeaders(),
      params: this.createParams({ id })
    });
  }

  createAnnouncement(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Announcement/Create`, data, {
      headers: this.getHeaders()
    });
  }

  updateAnnouncement(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Announcement/Update`, data, {
      headers: this.getHeaders()
    });
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Announcement/Delete`, {
      headers: this.getHeaders(),
      params: this.createParams({ id })
    });
  }

  // Similar CRUD operations can be added for other endpoints as needed
}