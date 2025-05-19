import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements AfterViewInit {

  constructor(private router: Router) {}

    estadosItems = [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PB', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ]

  ngAfterViewInit(): void {
    // Aplicar validação customizada do Bootstrap
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnLogin = document.querySelector<HTMLFormElement>('#btnSignin');

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
