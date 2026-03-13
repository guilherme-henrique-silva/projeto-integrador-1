import { Component } from '@angular/core';
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

  navItems = [
    { label: 'Consultas', route: '/consultas' },
    { label: 'Progresso', route: '/progresso' },
    { label: 'Avaliações', route: '/avaliacoes' }
  ];

  dropdownItems = [
    { label: 'Ver Perfil', route: '/perfil' },
    { label: 'Configurações', route: '/configuracoes' }
  ];

  constructor(private auth: AuthService, private router: Router) {}
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/welcome']);
  }

  getUserNome(): string {
    return this.auth.getUserNome() || 'Usuário';
  }
}