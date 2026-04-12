import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Redireciona se já estiver logado
    if (this.auth.getUserId()) {
      this.router.navigate(['/home']);
    }

    // Inicializa formulário com validações
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.auth.login(credentials).subscribe({
      next: (res) => {
        this.registerEvent.emit({
          success: true,
          message: 'Login realizado com sucesso!'
        });
        // Navega imediatamente após o sucesso
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.registerEvent.emit({
          success: false,
          message: err.error?.error || 'E-mail ou senha incorretos.'
        });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}