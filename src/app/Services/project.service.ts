import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

interface Project {
  id: number;
  name: string;
  budgetAmount: number;
  startDate: string;
  endDate: string;
  projectManagerId: number;
  projectCoordinatorId: number;
  employeeStationIds: number[];
  departmentIds: number[];
  clientCustomerId: number;
  description: string;
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}services/app/Project`;

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
   * Get all projects with optional pagination and filtering
   * @param params Optional query parameters (skipCount, maxResultCount, filter, etc.)
   */
  getAllProjects(params?: {
    skipCount?: number;
    maxResultCount?: number;
    filter?: string;
    sorting?: string;
  }): Observable<PagedResult<Project>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
          httpParams = httpParams.append(key, params[key as keyof typeof params]!.toString());
        }
      });
    }

    return this.http.get<PagedResult<Project>>(`${this.apiUrl}/GetAll`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  /**
   * Get a single project by ID
   * @param id Project ID
   */
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/Get`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }

  /**
   * Create a new project
   * @param projectData Project data to create
   */
  createProject(projectData: Omit<Project, 'id'>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/Create`, projectData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update an existing project
   * @param projectData Updated project data (must include id)
   */
  updateProject(projectData: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/Update`, projectData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete a project
   * @param id Project ID to delete
   */
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }

  /**
   * Get projects by status
   * @param status Project status filter
   */
  getProjectsByStatus(status: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/GetByStatus`, {
      headers: this.getHeaders(),
      params: { status }
    });
  }

  /**
   * Search projects by name or description
   * @param searchTerm Search term
   */
  searchProjects(searchTerm: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/Search`, {
      headers: this.getHeaders(),
      params: { searchTerm }
    });
  }
}