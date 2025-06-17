import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private apiUrl = `${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Get dropdown data for multiple targets
   * @param targets Array of target names (e.g., ['AnnouncementType', 'Department'])
   */
  getDropdownData(targets: string[]): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('Targets', targets.join(','));

    return this.http.get(this.apiUrl, { headers, params });
  }

  /**
   * Get dropdown data for a single target
   * @param target Target name (e.g., 'AnnouncementType')
   */
  getSingleDropdown(target: string): Observable<any> {
    return this.getDropdownData([target]);
  }

  // Specific methods for each dropdown type
  getAnnouncementTypes(): Observable<any> {
    return this.getSingleDropdown('AnnouncementType');
  }

  getDepartments(): Observable<any> {
    return this.getSingleDropdown('Department');
  }

  getDesignations(): Observable<any> {
    return this.getSingleDropdown('Designation');
  }

  getEmployeeStatuses(): Observable<any> {
    return this.getSingleDropdown('EmployeeStatus');
  }

  getGenders(): Observable<any> {
    return this.getSingleDropdown('Gender');
  }

  getEmployeeGroups(): Observable<any> {
    return this.getSingleDropdown('EmployeeGroup');
  }

  // Add more specific methods as needed for other dropdowns
  getCountries(): Observable<any> {
    return this.getSingleDropdown('Country');
  }

  getProvinces(): Observable<any> {
    return this.getSingleDropdown('Province');
  }

  getProjects(): Observable<any> {
    return this.getSingleDropdown('Project');
  }

  getStations(): Observable<any> {
    return this.getSingleDropdown('EmployeeStation');
  }

  getCities(): Observable<any> {
    return this.getSingleDropdown('City');
  }

  // ... add other specific methods following the same pattern
}