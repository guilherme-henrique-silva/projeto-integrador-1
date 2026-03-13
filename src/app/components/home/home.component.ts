import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Importe o Router
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopNavbarComponent, 
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId: string | null;
  userRole: string | null;
  userNome: string | null;

  // 2. Injete o Router no construtor
  constructor(private auth: AuthService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
    this.userNome = this.auth.getUserNome();
  }

  // 3. Crie o método que o HTML está chamando
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}