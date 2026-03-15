import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Adicionado RouterModule
import { AvaliacaoService } from '../../services/avaliacao.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-avaliacao-detalhe',
  standalone: true,
  imports: [CommonModule, TopNavbarComponent, RouterModule], // RouterModule deve estar aqui
  templateUrl: './avaliacao-detalhe.component.html',
  styleUrl: './avaliacao-detalhe.component.css'
})
export class AvaliacaoDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private avaliacaoService = inject(AvaliacaoService);
  private location = inject(Location);

  avaliacao: any = null;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.avaliacaoService.getById(id).subscribe({
        next: (data) => {
          this.avaliacao = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes', err);
          this.isLoading = false;
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}