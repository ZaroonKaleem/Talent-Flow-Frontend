import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentTypeService {
 private apiUrl = `${environment.apiUrl}services/app/DocumentType`;

  constructor(private http: HttpClient) { }

  /**
   * Get all designations with optional filtering and pagination
   * @param params Filter and pagination parameters
   * @returns Observable of any
   */
  getAllDocumentTypes(params?: any): Observable<any> {
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

createDocumentType(documentTypeData: {
        id: number;
        name: string;
    }): Observable<any> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.post<any>(`${this.apiUrl}/Create`, documentTypeData, {
            headers,
        });
    }


    deleteDocumentType(id: number): Observable<any> {
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