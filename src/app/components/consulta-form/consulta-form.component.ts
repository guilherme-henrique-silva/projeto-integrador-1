import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consulta-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.css'
})
export class ConsultaFormComponent implements AfterViewInit {

  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  userId: string | null;
  userRole: string | null;

  consultaForm = new FormGroup({
    nome: new FormControl(),
    data: new FormControl(),
    hora: new FormControl(),
    // status: new FormControl(),
    observacoes: new FormControl()
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private consultaService: ConsultaService, private userService: UserService, private router: Router) {

    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }
  
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

      const formValues = this.consultaForm.value;

      // Combina data e hora: '2025-05-25' + '15:00' -> ISO 8601: '2025-05-25T15:00:00'
      const dataCompleta = `${formValues.data}T${formValues.hora}:00`;

      const consulta = {
        data: dataCompleta,
        observacoes: formValues.observacoes,
        paciente_id: ''
      };


      this.consultarPorNome(formValues.nome).pipe(
        switchMap((pacienteData) => {
          consulta.paciente_id = pacienteData.id;
          return this.consultaService.addConsulta(consulta);
        })
      ).subscribe({
        next: () => {
          this.registerEvent.emit({
            success: true,
            message: 'Consulta registrada com sucesso!'
          });
        },
        error: (err) => {
          this.registerEvent.emit({
            success: false,
            message: err.error?.error || 'Erro ao consultar ou registrar a consulta.'
          });
        }
      });
    });


    //   this.consultarPorNome(formValues.nome).subscribe({
    //     next: (data) => {
    //       consulta.paciente_id = data.id;
    //       console.log(consulta);
          
    //     },
    //     error: (err) => {
    //       this.registerEvent.emit({
    //         success: false,
    //         message: err.error?.error || 'Erro ao consultar os dados do paciente.'
    //       });
    //     }
    //   });

    //   this.consultaService.addConsulta(consulta).subscribe({
    //     next: () => {
    //       this.registerEvent.emit({
    //         success: true,
    //         message: 'Consulta registrada com sucesso!'
    //       });
    //     },
    //     error: (err) => {
    //       console.error('Erro ao registrar consulta', err);
    //       this.registerEvent.emit({
    //         success: false,
    //         message: err.error?.error || `Erro ao registrar consulta: ${err.message}`
    //       });
    //     }
    //   });
    // });
  }

  consultarPorNome(nome: string): Observable<any> {
    return this.userService.getUserByName(nome);
  }

}
