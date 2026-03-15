import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para o search
import { AuthService } from '../../auth/auth.service';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-avaliacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent, FormsModule],
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.css'
})
export class AvaliacoesComponent implements OnInit {
  private auth = inject(AuthService);
  private avaliacaoService = inject(AvaliacaoService);
  public router = inject(Router);

  userRole: string | null = null;
  avaliacoesPaciente: Avaliacao[] = [];
  isLoading = true;
  filtroTexto: string = ''; // Texto da busca

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    this.avaliacaoService.listarPorPaciente('me').subscribe({
      next: (dados) => {
        this.avaliacoesPaciente = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar avaliações:', err);
        this.isLoading = false;
      }
    });
  }

  // Lógica de Filtro Reativo
  get avaliacoesFiltradas() {
    if (!this.filtroTexto) {
      return this.avaliacoesPaciente;
    }
    const termo = this.filtroTexto.toLowerCase();
    return this.avaliacoesPaciente.filter(av => 
      av.descricao?.toLowerCase().includes(termo) || 
      av.paciente?.nome?.toLowerCase().includes(termo) ||
      av.cid?.toLowerCase().includes(termo) ||
      av.risco?.toLowerCase().includes(termo)
    );
  }

  getRiscoClass(risco: string | undefined): string {
    const r = risco?.toLowerCase();
    if (r === 'grave') return 'bg-danger text-danger bg-opacity-10';
    if (r === 'moderado') return 'bg-warning text-warning bg-opacity-10';
    return 'bg-success text-success bg-opacity-10';
  }
}