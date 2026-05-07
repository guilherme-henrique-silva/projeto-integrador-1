import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../services/consulta.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-form.component.html'
})
export class ConsultaFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  private fb = inject(FormBuilder);
  private consultaService = inject(ConsultaService);
  private userService = inject(UserService);

  consultaForm!: FormGroup;
  psicologos: any[] = [];
  isSubmitting = false;

  ngOnInit(): void {
    this.carregarPsicologos();
    
    // Inicialização correta batendo com o formControlName do HTML
    this.consultaForm = this.fb.group({
      psicologoId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      observacoes: ['']
    });
  }

  carregarPsicologos() {
    this.userService.getPsicologos().subscribe({
      next: (data) => {
        this.psicologos = data;
      },
      error: (err) => {
        console.error('Erro ao listar psicólogos', err);
      }
    });
  }

  onSubmit(): void {
    if (this.consultaForm.invalid) {
      this.consultaForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { psicologoId, data, hora, observacoes } = this.consultaForm.value;

    // Formata a data para o padrão ISO que o Sequelize/MySQL espera
    const payload = {
      data: `${data}T${hora}:00`,
      observacoes: observacoes,
      psicologo_id: Number(psicologoId) 
    };

    this.consultaService.addConsulta(payload).subscribe({
      next: () => {
        this.registerEvent.emit({ success: true, message: 'Consulta agendada com sucesso!' });
        this.consultaForm.reset();
        this.isSubmitting = false;
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.error('Erro no agendamento:', err);
        this.registerEvent.emit({ success: false, message: 'Erro ao agendar consulta. Tente novamente.' });
      }
    });
  }
}