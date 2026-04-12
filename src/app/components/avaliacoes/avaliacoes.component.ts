import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service'; 

@Component({
  selector: 'app-avaliacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.css'
})
export class AvaliacoesComponent implements OnInit {

  userId: string | null;
  userRole: string | null;
  avaliacoesPaciente: Avaliacao[] = [];
  isLoading = true;

  // Alterado de private para public para o HTML conseguir enxergar
  constructor(
    private auth: AuthService, 
    private avaliacaoService: AvaliacaoService,
    public router: Router 
  ) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    if (this.userId) {
      this.avaliacaoService.listarPorPaciente(this.userId).subscribe({
        next: (dados) => {
          this.avaliacoesPaciente = dados;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar avaliações:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  visualizar(id: number | undefined) {
    if (id) this.router.navigate(['/avaliacao', id]);
  }
  getRiscoClass(risco: string | undefined): string {
  const r = risco?.toLowerCase();
  if (r === 'grave') return 'bg-danger-subtle';
  if (r === 'moderado') return 'bg-warning-subtle';
  return 'bg-success-subtle'; // Leve ou default
}
}