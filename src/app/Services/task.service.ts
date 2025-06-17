import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

// Define interface for the Task data
interface Task {
  id?: number; // Optional for creation
  name: string;
  projectId: number;
  employeeStationIds: number[];
  departmentIds: number[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}services/app/Task`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Get all tasks with optional filtering and pagination
   * @param params Optional query parameters (skipCount, maxResultCount, filter, etc.)
   */
  getAllTasks(params?: any): Observable<any> {
    const headers = this.getHeaders();
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key].toString());
        }
      });
    }

    return this.http.get(`${this.apiUrl}/GetAll`, {
      headers,
      params: httpParams
    });
  }

  /**
   * Get a single task by ID
   * @param id Task ID
   */
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Get`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }

  /**
   * Create a new task
   * @param taskData Task data to create
   */
  createTask(taskData: Task): Observable<any> {
    // You can add validation here if needed
    if (!taskData.name || !taskData.projectId) {
      throw new Error('Name and Project ID are required');
    }

    return this.http.post(`${this.apiUrl}/Create`, taskData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update an existing task
   * @param taskData Updated task data
   */
  updateTask(taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update`, taskData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete a task
   * @param id Task ID to delete
   */
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete`, {
      headers: this.getHeaders(),
      params: { id: id.toString() }
    });
  }
}