import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';


interface GazettedHoliday {
  id: number;
  name: string;
  eventDate: string;
  employeeStations: { id: number; name: string }[];
  employeeGroups: { id: number; name: string }[];
  exemptedEmployees: { id: number; name: string }[];
  sendEmail: boolean;
  description: string;
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class GazettedHolidaysService {
  private apiUrl = `${environment.apiUrl}services/app/GazettedHoliday`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  /**
   * Get all gazetted holidays with optional pagination and filtering
   * @param params Optional query parameters (skipCount, maxResultCount, filter, etc.)
   */
  getAllHolidays(params?: {
    skipCount?: number;
    maxResultCount?: number;
    filter?: string;
    sorting?: string;
  }): Observable<PagedResult<GazettedHoliday>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
          httpParams = httpParams.append(key, params[key as keyof typeof params]!.toString());
        }
      });
    }

    return this.http.get<PagedResult<GazettedHoliday>>(`${this.apiUrl}/GetAll`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  /**
   * Get a single holiday by ID
   * @param id Holiday ID
   */
  getHolidayById(id: number): Observable<GazettedHoliday> {
    return this.http.get<GazettedHoliday>(`${this.apiUrl}/Get`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }

  /**
   * Create a new gazetted holiday
   * @param holidayData Holiday data to create
   */
  createHoliday(holidayData: Omit<GazettedHoliday, 'id'>): Observable<GazettedHoliday> {
    return this.http.post<GazettedHoliday>(`${this.apiUrl}/Create`, holidayData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update an existing holiday
   * @param holidayData Updated holiday data (must include id)
   */
  updateHoliday(holidayData: GazettedHoliday): Observable<GazettedHoliday> {
    return this.http.put<GazettedHoliday>(`${this.apiUrl}/Update`, holidayData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete a holiday
   * @param id Holiday ID to delete
   */
  deleteHoliday(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }

  /**
   * Get holidays by year
   * @param year Year to filter by
   */
  getHolidaysByYear(year: number): Observable<GazettedHoliday[]> {
    return this.http.get<GazettedHoliday[]>(`${this.apiUrl}/GetByYear`, {
      headers: this.getHeaders(),
      params: { year: year.toString() }
    });
  }

  /**
   * Get upcoming holidays
   * @param days Number of days to look ahead
   */
  getUpcomingHolidays(days: number = 30): Observable<GazettedHoliday[]> {
    return this.http.get<GazettedHoliday[]>(`${this.apiUrl}/GetUpcoming`, {
      headers: this.getHeaders(),
      params: { days: days.toString() }
    });
  }
}