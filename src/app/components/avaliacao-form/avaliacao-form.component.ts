import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-avaliacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './avaliacao-form.component.html'
})
export class AvaliacaoFormComponent implements OnInit {
  private avaliacaoService = inject(AvaliacaoService);
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  public router = inject(Router);

  formAvaliacao!: FormGroup;
  isSubmitting = false;
  niveis = Array.from({ length: 10 }, (_, i) => i + 1);
  
  userRole: string | null = null;
  pacientes: any[] = [];
  consultas: any[] = [];

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
    
    this.formAvaliacao = new FormGroup({
      pacienteId: new FormControl('', [Validators.required]),
      consultaId: new FormControl(''),
      pontuacao: new FormControl('', [Validators.required]),
      risco: new FormControl('Moderado', [Validators.required]), // Campo blindado
      observacoes: new FormControl(''),
      cid: new FormControl(''),
      descricao: new FormControl(this.userRole === 'psicologo' ? 'Evolução Clínica' : 'Autoavaliação')
    });

    // Lógica que sugere o risco, mas permite alteração manual
    this.formAvaliacao.get('pontuacao')?.valueChanges.subscribe(nota => {
      if (nota >= 8) this.formAvaliacao.get('risco')?.setValue('Leve');
      else if (nota <= 4) this.formAvaliacao.get('risco')?.setValue('Grave');
      else this.formAvaliacao.get('risco')?.setValue('Moderado');
    });

    if (this.userRole === 'psicologo') {
      this.carregarPacientes();
      this.formAvaliacao.get('pacienteId')?.valueChanges.subscribe(id => {
        if (id) this.carregarConsultas(id);
        else this.consultas = [];
      });
    } else {
      this.formAvaliacao.get('pacienteId')?.setValue(this.auth.getUserId());
    }
  }

  carregarPacientes() {
    this.avaliacaoService.listarTodosPacientes().subscribe(res => this.pacientes = res);
  }

  carregarConsultas(pacienteId: string) {
    this.avaliacaoService.listarConsultasPorPaciente(pacienteId).subscribe(res => this.consultas = res);
  }

  onSubmit() {
    if (this.formAvaliacao.invalid) return;
    this.isSubmitting = true;

    const payload = {
      ...this.formAvaliacao.value,
      data: new Date().toISOString()
    };

    this.avaliacaoService.salvar(payload).subscribe({
      next: () => {
        alert('Avaliação registrada!');
        this.router.navigate(['/avaliacoes']);
      },
      error: () => this.isSubmitting = false
    });
  }
}