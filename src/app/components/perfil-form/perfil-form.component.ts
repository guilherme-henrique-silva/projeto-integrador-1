import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  form: FormGroup;
  userId: string | null;
  estadosItems = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.userId = this.auth.getUserId();

    // Inicialização do Formulário com Validações
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['paciente', Validators.required],
      crp: [''],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['SP', Validators.required],
      cep: ['', [Validators.required, Validators.pattern('[0-9]{8}')]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    if (!this.userId) return;

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        const parts = data.endereco?.split(',') || [];

        // patchValue preenche o formulário de uma vez
        this.form.patchValue({
          ...data,
          endereco: parts[0]?.trim(),
          cidade: parts[1]?.trim(),
          estado: parts[2]?.trim() || 'SP',
          cep: parts[3]?.trim()
        });
      },
      error: (err: any) => this.handleMessage(false, 'Erro ao atualizar perfil')
    });
  }

  onSubmit() {
    if (this.form.invalid || !this.userId) return;

    const rawValue = this.form.value;
    const dataToSave = {
      ...rawValue,
      endereco: `${rawValue.endereco}, ${rawValue.cidade}, ${rawValue.estado}, ${rawValue.cep}`
    };

    this.userService.updateUserById(this.userId, dataToSave).subscribe({
      next: () => this.handleMessage(true, 'Perfil atualizado com sucesso!'),
      error: (err) => this.handleMessage(false, 'Erro ao atualizar perfil.')
    });
  }

  onDelete() {
    if (!this.userId || !confirm('Tem certeza que deseja excluir sua conta?')) return;

    this.userService.deleteUserById(this.userId).subscribe({
      next: () => {
        this.handleMessage(true, 'Conta excluída. Saindo...');
        setTimeout(() => this.auth.logout(), 2000);
      },
      error: () => this.handleMessage(false, 'Erro ao excluir conta.')
    });
  }

  private handleMessage(success: boolean, message: string) {
    this.registerEvent.emit({ success, message });
  }
}