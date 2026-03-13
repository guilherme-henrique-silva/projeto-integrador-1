import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { ConsultaService } from '../../services/consulta.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.css'
})
export class ConsultaFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  consultaForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private consultaService: ConsultaService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.consultaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      observacoes: ['']
    });
  }

  onSubmit(): void {
    if (this.consultaForm.invalid) {
      this.consultaForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { nome, data, hora, observacoes } = this.consultaForm.value;
    const dataCompleta = `${data}T${hora}:00`;

    // Fluxo: Busca ID do paciente -> Salva Consulta
    this.userService.getUserByName(nome).pipe(
      switchMap((pacienteData) => {
        const payload = {
          data: dataCompleta,
          observacoes: observacoes,
          paciente_id: pacienteData.id
        };
        return this.consultaService.addConsulta(payload);
      })
    ).subscribe({
      next: () => {
        this.registerEvent.emit({ success: true, message: 'Consulta agendada com sucesso!' });
        this.consultaForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.registerEvent.emit({
          success: false,
          message: err.error?.message || 'Erro ao processar agendamento.'
        });
      }
    });
  }
}