import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avaliacao {
  id?: number;
  data: string;
  descricao: string;
  cid?: string;
  pacienteId: string;
  nota?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private readonly API = 'http://localhost:3000/avaliacoes';

  constructor(private http: HttpClient) {}

  getProgresso(pacienteId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/progresso/${pacienteId}`);
  }

  listarPorPaciente(pacienteId: string): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.API}/paciente/${pacienteId}`);
  }

  buscarPorId(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.API}/${id}`);
  }

  salvar(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.API, avaliacao);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}