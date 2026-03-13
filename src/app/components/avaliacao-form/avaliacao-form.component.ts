import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './avaliacao-form.component.html',
  styleUrl: './avaliacao-form.component.css'
})
export class AvaliacaoFormComponent {
  
  // Cria o array [1, 2, ..., 10] dinamicamente
  niveis = Array.from({ length: 10 }, (_, i) => i + 1);

  formAvaliacao = new FormGroup({
    nota: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.formAvaliacao.valid) {
      console.log('Valor selecionado:', this.formAvaliacao.value.nota);
      // Aqui você chamaria o seu avaliacaoService.salvar()
    }
  }
}