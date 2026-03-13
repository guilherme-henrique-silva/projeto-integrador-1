import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service'; // Ajuste o caminho conforme sua pasta

// Verifique se o caminho do arquivo está correto
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    TopNavbarComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-integrador-1';

  constructor(public authService: AuthService) {}

  // Método auxiliar para o template
  isLoggedIn(): boolean {
    return !!this.authService.getUserId(); // Ou a lógica que você usa para validar o token
  }
}