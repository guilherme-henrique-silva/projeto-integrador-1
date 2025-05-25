import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements AfterViewInit {

  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  emailInput = '';
  passwordInput = '';
  
  userId: string | null;
  userRole: string | null;

  constructor(private auth: AuthService, private login: LoginService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
    if(this.userId != null) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnLogin = document.querySelector<HTMLFormElement>('#btnLogin');

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
      const data = {
        username: this.emailInput,
        password: this.passwordInput
      }

      this.auth.login(data).subscribe({
        next: () => {
          this.registerEvent.emit({
            success: true,
            message: 'Login realizado com sucesso!'
          });

        },
        error: (err) => {
          this.registerEvent.emit({
            success: false,
            message: err.error?.error || 'Erro ao realizar o login.'
          });
        }
      });
      
      this.userId = this.auth.getUserId();
      this.userRole = this.auth.getUserRole();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    })
  }

}
