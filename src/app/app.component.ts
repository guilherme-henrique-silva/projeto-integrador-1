import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    FooterComponent // <-- O componente deve estar aqui
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-integrador-1';
}