import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { Router } from '@angular/router';
import { Consulta, ConsultaService } from '../../services/consulta.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consultas',
  imports: [TopNavbarComponent],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent implements OnInit {

  userId: string | null;
  userRole: string | null;

  tableColumns = ['Data', 'Status', 'Observações', this.setTableRole().replace('p', 'P')];

  constructor(private auth: AuthService, private router: Router, private consultaService: ConsultaService) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  ngOnInit(): void {
    this.consultaService.getConsultas().subscribe(data => this.consultas = data);
  }

  // consultas: any[] = [
  //   {
  //     id: 1,
  //     data: '23/05/2025 16:00',
  //     status: 'concluída',
  //     observacoes: '',
  //     paciente: 'João José dos Santos',
  //     psicologo: 'Antonio Carlos da Silva'
  //   },
  //   {
  //     id: 2,
  //     data: '23/05/2025 16:00',
  //     status: 'concluída',
  //     observacoes: '',
  //     paciente: 'João José dos Santos',
  //     psicologo: 'Antonio Carlos da Silva'
  //   }
  // ]

  consultas: Consulta[] = [];

  setTableRole() {
    return this.userRole === 'psicologo' ? 'paciente' : 'psicologo';
  }

  consultasHasData() {
    return this.consultas.length > 0;
  }

  editConsulta(id?: number) {
    if (id != undefined) {
      this.router.navigate(['edit/consulta', id]);
    } else {
      this.router.navigate(['create/consulta']);
    }
  }

  deletar(id: number) {
    this.consultaService.deleteConsulta(id).subscribe(() => {
      this.consultas = this.consultas.filter(c => c.id !== id);
    });
  }

  showAlert() {
    const alertPlaceholder = document.querySelector<HTMLElement>('#liveAlertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      '<div class="alert alert-success alert-dismissible" role="alert">',
      '   <div>Consulta excluída com sucesso!</div>',
      '</div>'
    ].join('');
    if(alertPlaceholder) {
      alertPlaceholder.append(wrapper);
      setTimeout(() => {
        alertPlaceholder.removeChild(wrapper);
      }, 3000);
    }

  }

}

