import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = "http://localhost:3000/api/users";
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  getPsicologos(): Observable<any[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    // Certifique-se que a URL é exatamente esta (plural 'users' e 'psicologos')
    return this.http.get<any[]>("http://localhost:3000/api/users/psicologos", { headers });
  }

  getUserById(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
    return this.http.get(`${this.API}/${userId}`, { headers });
  }

  // REINSTALANDO MÉTODO: Erro TS2339 (updateUserById)
  updateUserById(userId: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
    return this.http.put(`${this.API}/${userId}`, data, { headers });
  }

  // REINSTALANDO MÉTODO: Erro TS2551 (deleteUserById)
  deleteUserById(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
    return this.http.delete(`${this.API}/${userId}`, { headers });
  }
}