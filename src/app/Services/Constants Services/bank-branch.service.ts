import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
    providedIn: 'root',
})
export class BankBranchService {
    private apiUrl = `${environment.apiUrl}services/app/BankBranch`;

    constructor(private http: HttpClient) {}

    /**
     * Get all employee stations with optional filtering and pagination
     * @param params Filter and pagination parameters
     * @returns Observable of any
     */
    getAllBankBranches(params?: any): Observable<any> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        // Convert params object to HttpParams
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }

        return this.http.get<any>(`${this.apiUrl}/GetAll`, {
            headers,
            params: httpParams,
        });
    }

    /**
     * Create a new employee group
     * @param employeeGroup Data for the new employee group
     * @returns Observable of the created employee group
     */
    createBankBranch(BankBranch: {
        id: number;
        name: string;
        EmployerBankId: number;
        cityId: number;
        branchNumber: string;
        accountNumber: string;
        accountName: string;
    }): Observable<any> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.post<any>(`${this.apiUrl}/Create`, BankBranch, {
            headers,
        });
    }

        deleteBankBranch(id: number): Observable<any> {
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

      /**
     * Update an existing employee group
     * @param employeeGroup Data for the employee group to update
     * @returns Observable of the updated employee group
     */
    updateBankBranch(bankBranch: {
        id: number;
        name: string;
        EmployerBankId: number;
        cityId: number;
        branchNumber: string;
        accountNumber: string;
        accountName: string;
    }): Observable<any> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.put<any>(`${this.apiUrl}/Update`, bankBranch, {
            headers,
        });
    }

}
