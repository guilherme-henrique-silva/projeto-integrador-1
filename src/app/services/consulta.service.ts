import { HttpClient, HttpHeaders } from '@angular/common/http'; // Adicionado HttpHeaders
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Certifique-se que o caminho está correto

export interface Consulta {
  id: number;
  data: string;
  status: string;
  observacoes: string;
  paciente?: { id: number; nome: string }; 
  psicologo?: { id: number; nome: string };
}

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly API = 'http://localhost:3000/api/consultas';
  private http = inject(HttpClient);
  private auth = inject(AuthService); // Injetando o AuthService para pegar o token

  getConsultas(): Observable<Consulta[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Consulta[]>(this.API, { headers });
  }

  updateStatus(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
    return this.http.put(`${this.API}/${id}/status`, { status }, { headers });
  }

  // Corrigido: Agora aceita o payload flexível e usa os headers corretamente
  addConsulta(payload: { 
    data: string; 
    observacoes: string; 
    paciente_id?: number;  
    psicologo_id?: number; 
  }): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
    return this.http.post(this.API, payload, { headers });
  }

  deleteConsulta(id: number): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.API}/${id}`, { headers });
  }
}