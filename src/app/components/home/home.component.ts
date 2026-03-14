import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Removi o TopNavbarComponent daqui
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;
  userNome: string | null = null;
  saudacao: string = 'Bem-vindo';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
    this.userNome = this.auth.getUserNome() || 'Visitante';
    this.definirSaudacao();
  }

  private definirSaudacao(): void {
    const hora = new Date().getHours();
    if (hora < 12) this.saudacao = 'Bom dia';
    else if (hora < 18) this.saudacao = 'Boa tarde';
    else this.saudacao = 'Boa noite';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}