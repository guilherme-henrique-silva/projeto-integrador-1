import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SigninFormComponent implements AfterViewInit{

  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  userId: string | null;
  userRole: string | null;

  nomeInput = '';
  telefoneInput = '';
  emailInput = '';
  passwordInput = '';
  roleRadio = '';
  crpInput = '';
  enderecoInput = '';
  cidadeInput = '';
  estadoSelect = '';
  CEPInput = '';
  checkboxInput = '';

  isCheckedPsicologo: boolean = false;

  constructor(private auth: AuthService, private register: RegisterService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
    if(this.userId != null) {
      this.router.navigate(['/home']);
    }
  }

  estadosItems = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PB', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  ngAfterViewInit(): void {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnSignin = document.querySelector<HTMLFormElement>('#btnSignin');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    addEventListener("submit", (event) => {

      const enderecoCompleto: string[] = [
        this.enderecoInput, this.cidadeInput, this.estadoSelect, this.CEPInput
      ];

      const data = {
        username: this.emailInput,
        password: this.passwordInput,
        role: this.roleRadio,
        nome: this.nomeInput,
        crp: this.crpInput,
        telefone: this.telefoneInput,
        endereco: enderecoCompleto.join(' ')
      }

      this.register.registrar(data).subscribe({
        next: () => {
          this.registerEvent.emit({
            success: true,
            message: 'Registro realizado com sucesso!'
          });

        },
        error: (err) => {
          this.registerEvent.emit({
            success: false,
            message: err.error?.error || 'Erro ao registrar usuário.'
          });
        }
      });

      this.userId = this.auth.getUserId();
      this.userRole = this.auth.getUserRole();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    });
  }

  onChange() {
    this.roleRadio == 'paciente' ? this.isCheckedPsicologo = false : this.isCheckedPsicologo = true;
  }

}
