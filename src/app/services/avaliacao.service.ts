  import { Injectable, inject } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

export interface Avaliacao {
  id?: number;
  data: string;
  descricao: string;
  cid?: string;
  pacienteId: string | number;
  consultaId?: string | number | null;
  pontuacao: number;
  risco?: string;
  observacoes?: string;
  // Adicione esta linha para o TypeScript não reclamar:
  paciente?: { nome: string }; 
}

  @Injectable({ providedIn: 'root' })
  export class AvaliacaoService {
    private readonly API = 'http://localhost:3000/api';
    private http = inject(HttpClient);

    salvar(avaliacao: Avaliacao): Observable<Avaliacao> {
      return this.http.post<Avaliacao>(`${this.API}/avaliacoes`, avaliacao);
    }

    listarPorPaciente(pacienteId: string | number): Observable<Avaliacao[]> {
      return this.http.get<Avaliacao[]>(`${this.API}/avaliacoes/paciente/${pacienteId}`);
    }

    getProgresso(pacienteId: string | number): Observable<any[]> {
      return this.http.get<any[]>(`${this.API}/avaliacoes/progresso/${pacienteId}`);
    }

    listarTodosPacientes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API}/pacientes`);
    }

    listarConsultasPorPaciente(pacienteId: string | number): Observable<any[]> {
      return this.http.get<any[]>(`${this.API}/consultas/paciente/${pacienteId}`);
    }

    getById(id: number | string): Observable<Avaliacao> {
      return this.http.get<Avaliacao>(`${this.API}/avaliacoes/${id}`);
    }

    deletar(id: number): Observable<any> {
      return this.http.delete(`${this.API}/avaliacoes/${id}`);
    }
  }