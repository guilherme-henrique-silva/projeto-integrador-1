import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [],
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
    { label: 'Perfil', route: '/perfil' }
  ];

  constructor(private auth: AuthService, private router: Router) {}
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.auth.logout();
  }

  getUserNome() {
    return this.auth.getUserNome();
  }
}
