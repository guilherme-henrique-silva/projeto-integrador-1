import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private readonly API = 'http://localhost:3000/avaliacoes';

  constructor(private http: HttpClient) {}

  /**
   * DASHBOARD: Busca dados formatados para o Google Charts
   * Retorno esperado: [['Jan', 5], ['Fev', 8]]
   */
  getProgresso(pacienteId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/progresso/${pacienteId}`);
  }

  /**
   * TABELA: Lista todas as avaliações de um paciente para o histórico
   */
  listarPorPaciente(pacienteId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/paciente/${pacienteId}`);
  }

  /**
   * DETALHE: Busca uma avaliação específica pelo ID
   */
  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  /**
   * CRIAÇÃO: Método usado pelo psicólogo para registrar nova sessão
   */
  salvar(avaliacao: any): Observable<any> {
    return this.http.post<any>(this.API, avaliacao);
  }

  /**
   * EXCLUSÃO: Remove um registro (se necessário)
   */
  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}