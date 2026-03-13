import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para Pipes e Diretivas
import { Router } from '@angular/router';
import { Consulta, ConsultaService } from '../../services/consulta.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule], // Removi Navbar pois já está no app.component
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent implements OnInit {
  userId: string | null;
  userRole: string | null;
  consultas: Consulta[] = [];
  
  // Controle de Alerta e Modal
  alertMessage: string | null = null;
  selectedConsultaId: number | null = null;

  constructor(private auth: AuthService, private router: Router, private consultaService: ConsultaService) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas() {
    this.consultaService.getConsultas().subscribe(data => this.consultas = data);
  }

  // Prepara o ID para exclusão quando o usuário clica no botão da tabela
  prepararExclusao(id: number) {
    this.selectedConsultaId = id;
  }

  confirmarExclusao() {
    if (this.selectedConsultaId) {
      this.consultaService.deleteConsulta(this.selectedConsultaId).subscribe({
        next: () => {
          this.consultas = this.consultas.filter(c => c.id !== this.selectedConsultaId);
          this.mostrarAlerta('Consulta excluída com sucesso!');
          this.selectedConsultaId = null;
        },
        error: () => this.mostrarAlerta('Erro ao excluir consulta.', 'danger')
      });
    }
  }

  mostrarAlerta(msg: string, type: string = 'success') {
    this.alertMessage = msg;
    setTimeout(() => this.alertMessage = null, 3000);
  }

  navegarParaForm(id?: number) {
    if (id) this.router.navigate(['edit/consulta', id]);
    else this.router.navigate(['create/consulta']);
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'agendada': 'bg-primary-subtle text-primary',
      'concluida': 'bg-success-subtle text-success',
      'cancelada': 'bg-danger-subtle text-danger'
    };
    return classes[status.toLowerCase()] || 'bg-secondary-subtle';
  }
}