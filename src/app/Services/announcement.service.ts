import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.apiUrl}services/app`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Announcement/Create`, announcement, { 
      headers: this.getHeaders() 
    });
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Announcement/Delete`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }
}