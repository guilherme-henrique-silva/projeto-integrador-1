import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

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

}
