import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Consulta, ConsultaService } from '../../services/consulta.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultas.component.html'
})
export class ConsultasComponent implements OnInit {
  private auth = inject(AuthService);
  private consultaService = inject(ConsultaService);
  private router = inject(Router);

  consultas: Consulta[] = [];
  userRole = this.auth.getUserRole();
  alertMessage: string | null = null;
  selectedConsultaId: number | null = null;

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas() {
    this.consultaService.getConsultas().subscribe({
      next: (data) => this.consultas = data,
      error: (err) => console.error('Erro ao carregar consultas', err)
    });
  }

  // CORREÇÃO: Função para o botão "Nova Consulta"
  navegarParaForm() {
    this.router.navigate(['/nova-consulta']); 
  }

  // CORREÇÃO: Função para definir as cores dos badges de status
  getStatusClass(status: string): string {
    const s = status?.toLowerCase();
    if (s === 'agendada') return 'bg-primary-subtle text-primary';
    if (s === 'concluida') return 'bg-success-subtle text-success';
    if (s === 'cancelada') return 'bg-danger-subtle text-danger';
    return 'bg-secondary-subtle text-secondary';
  }

  // CORREÇÃO: Seta o ID para o modal de exclusão saber quem deletar
  prepararExclusao(id: number | undefined) {
    if (id) this.selectedConsultaId = id;
  }

  confirmarExclusao() {
    if (this.selectedConsultaId) {
      this.consultaService.deleteConsulta(this.selectedConsultaId).subscribe({
        next: () => {
          this.consultas = this.consultas.filter(c => c.id !== this.selectedConsultaId);
          this.alertMessage = 'Consulta removida com sucesso!';
          setTimeout(() => this.alertMessage = null, 3000);
        },
        error: (err) => console.error('Erro ao excluir', err)
      });
    }
  }

  getPacienteNome(c: Consulta): string {
    return c.paciente?.nome || 'Não informado';
  }
  atualizarStatus(id: number, novoStatus: string) {
    this.consultaService.updateStatus(id, novoStatus).subscribe({
      next: () => {
        // Atualiza a lista localmente para não precisar recarregar a página
        const index = this.consultas.findIndex(c => c.id === id);
        if (index !== -1) {
          this.consultas[index].status = novoStatus;
        }
        this.alertMessage = `Consulta marcada como ${novoStatus}!`;
        setTimeout(() => this.alertMessage = null, 3000);
      },
      error: (err) => console.error('Erro ao atualizar status', err)
    });
  }
}