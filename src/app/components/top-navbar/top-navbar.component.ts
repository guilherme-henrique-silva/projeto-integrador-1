import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {

  navItems = [
    { label: 'Consultas', route: '/consultas' },
    { label: 'Progresso', route: '/progresso' },
    { label: 'Laudos', route: '/laudos' }
  ];
  dropdownItems = [
    { label: 'Perfil', route: '/perfil' },
    { label: 'Configurações', route: '/configuracoes' }
  ];

  constructor(private router: Router) {}
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    // Aqui você pode adicionar lógica de logout, como limpar tokens, etc.
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
