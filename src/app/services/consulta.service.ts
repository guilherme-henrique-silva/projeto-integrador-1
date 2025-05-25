import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Consulta {
  id: number;
  data: string;
  status: string;
  observacoes: string;
  paciente: string;
  psicologo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  
  private apiUrl = 'http://localhost:3000/api/consultas';

  constructor(private auth: AuthService, private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<Consulta[]>(this.apiUrl, { headers });
  }

  getConsulta(id: number): Observable<Consulta> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`, { headers });
  }

  addConsulta(consulta: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl, consulta, { headers });
  }

  updateConsulta(id: number, consulta: Partial<Consulta>): Observable<Consulta> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta, { headers });
  }

  deleteConsulta(id: number): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

}
