import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  getConsulta(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  addConsulta(consulta: Omit<Consulta, 'id'>): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  updateConsulta(id: number, consulta: Partial<Consulta>): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta);
  }

  deleteConsulta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
