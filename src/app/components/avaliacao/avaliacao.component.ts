import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoFormComponent } from '../avaliacao-form/avaliacao-form.component';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  // A Navbar não entra aqui pois já é global no app.component
  imports: [CommonModule, AvaliacaoFormComponent],
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.css'
})
export class AvaliacaoComponent {
  // Este componente agora serve como um "Container" organizado para o formulário
}