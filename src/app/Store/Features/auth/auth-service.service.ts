import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/TokenAuth/Authenticate';

  constructor(private http: HttpClient) {}

  login(
    userNameOrEmailAddress: string,
    password: string,
    rememberClient: boolean
  ): Observable<any> {
    return this.http.post(this.apiUrl, {
      userNameOrEmailAddress,
      password,
      rememberClient
    });
  }
}