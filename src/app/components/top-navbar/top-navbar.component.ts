import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  // O getter que o HTML consome
  get filteredNavItems() {
    const role = this.auth.getUserRole();
    
    const allItems = [
      { label: 'Consultas', route: '/consultas', roles: ['paciente', 'psicologo'] },
      { label: 'Meu Progresso', route: '/progresso', roles: ['paciente'] },
      { label: 'Avaliações', route: '/avaliacoes', roles: ['paciente', 'psicologo'] },
      { label: 'Progresso dos Pacientes', route: '/progresso', roles: ['psicologo'] }
    ];

    // Se o role for nulo, retorna lista vazia por segurança
    return allItems.filter(item => item.roles.includes(role || ''));
  }

  getUserNome() { 
    return this.auth.getUserNome() || 'Usuário'; 
  }

  navigateTo(route: string) { 
    this.router.navigate([route]); 
  }

  logout() { 
    this.auth.logout(); 
  }
}