import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  form: FormGroup;
  estadosItems = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, 
    private register: RegisterService, 
    private router: Router
  ) {
    // Redireciona se já estiver logado
    if (this.auth.getUserId()) {
      this.router.navigate(['/home']);
    }

    // Inicialização do Formulário Reativo
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      role: ['paciente', Validators.required],
      crp: [''],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['SP', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      termos: [false, Validators.requiredTrue] // Obrigatório aceitar
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const rawValue = this.form.value;
    const enderecoCompleto = `${rawValue.endereco}, ${rawValue.cidade}, ${rawValue.estado}, ${rawValue.cep}`;

    const payload = {
      username: rawValue.username,
      password: rawValue.password,
      role: rawValue.role,
      nome: rawValue.nome,
      crp: rawValue.role === 'psicologo' ? rawValue.crp : null,
      telefone: rawValue.telefone,
      endereco: enderecoCompleto
    };

    // Primeiro Registra, depois Loga
    this.register.registrar(payload).subscribe({
      next: () => {
        this.loginAposRegistro(payload);
      },
      error: (err) => {
        this.emitMessage(false, err.error?.error || 'Erro ao realizar cadastro.');
      }
    });
  }

  private loginAposRegistro(credentials: any) {
    this.auth.login(credentials).subscribe({
      next: () => {
        this.emitMessage(true, 'Bem-vindo à Mentalize!');
        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: () => {
        this.emitMessage(false, 'Cadastro ok, mas houve erro no login automático.');
        this.router.navigate(['/login']);
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  private emitMessage(success: boolean, message: string) {
    this.registerEvent.emit({ success, message });
  }
}