import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  error: string | null = null;
  success: boolean = false;
  private USER_URL = "http://localhost:3000/api/users"

  constructor(private auth: AuthService, private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.get(`${this.USER_URL}/${userId}`, { headers });
  }

  updateUserById(userId: string, data: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.USER_URL}/${userId}`, data, { headers });
  }

  deleteUserById(userId: string): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete(`${this.USER_URL}/${userId}`, { headers });
  }
}
