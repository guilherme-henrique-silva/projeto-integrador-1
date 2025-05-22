import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements AfterViewInit {

  isCheckedPsicologo: boolean = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Aplicar validação customizada do Bootstrap
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
      alert('Olá! Vamos buscar na nossa base esse usuário e senha...');
      this.router.navigate(['/home']);
    })
  }

  onChange() {
    this.isCheckedPsicologo = !this.isCheckedPsicologo;
  }

}
