import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-form',
  imports: [],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.css'
})
export class ConsultaFormComponent implements AfterViewInit {

  constructor(private router: Router) {}
  
  ngAfterViewInit(): void {
    // Aplicar validação customizada do Bootstrap
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnSignin = document.querySelector<HTMLFormElement>('#btnCadastrarConsulta');

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
