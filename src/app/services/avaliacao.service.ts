import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avaliacao {
  id: number;
  data: string;
  risco: string;
  observacoes: string;
  paciente: string;
  psicologo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private apiUrl = 'http://localhost:3000/api/avaliacoes';

  constructor(private auth: AuthService, private http: HttpClient) { }

  getAvaliacoes(userId: string | null, userRole: string | null): Observable<Avaliacao[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    let query_params = new HttpParams();
    if(userRole === 'psicologo' && userId) {
      query_params.append('psicologo_id', userId);
    } else if(userRole === 'paciente' && userId) {
      query_params.append('paciente_id', userId);
    }
    return this.http.get<Avaliacao[]>(this.apiUrl, { params: query_params, headers });
  }

  getAvaliacao(id: number): Observable<Avaliacao> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<Avaliacao>(`${this.apiUrl}/${id}`, { headers });
  }

  addAvaliacao(avaliacao: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl, avaliacao, { headers });
  }
  
  updateAvaliacao(id: number, avaliacao: Partial<Avaliacao>): Observable<Avaliacao> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put<Avaliacao>(`${this.apiUrl}/${id}`, avaliacao, { headers });
  }

  deleteAvaliacao(id: number): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
