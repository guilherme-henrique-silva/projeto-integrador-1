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
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnSalvar = document.querySelector<HTMLFormElement>('#btnSalvarConsulta');

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
      this.router.navigate(['/home']);
    })
  }

}
