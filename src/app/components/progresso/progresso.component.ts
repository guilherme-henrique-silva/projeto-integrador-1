import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Avaliacao, AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-progresso',
  imports: [TopNavbarComponent, GoogleChartsModule],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.css'
})
export class ProgressoComponent {

  userId: string | null;
  userRole: string | null;

  constructor(private auth: AuthService, private router: Router, private avaliacaoService: AvaliacaoService) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  avaliacoes: Avaliacao[] = [
    { id: 0, data: "2025-05-25 17:54:18", risco: "5", observacoes: "Nenhuma observação", paciente: "João Silva", psicologo: "Dra. Maria Oliveira" },
    { id: 1, data: "2025-06-01 10:30:00", risco: "6", observacoes: "Leve aumento nos sintomas", paciente: "João Silva", psicologo: "Dra. Maria Oliveira"},
    { id: 2, data: "2025-06-15 14:15:45", risco: "5", observacoes: "Sintomas estabilizados", paciente: "João Silva", psicologo: "Dra. Maria Oliveira" },
    { id: 3, data: "2025-07-01 09:00:00", risco: "7", observacoes: "Aumento significativo nos sintomas", paciente: "João Silva", psicologo: "Dra. Maria Oliveira"},
    { id: 4, data: "2025-07-20 11:45:30", risco: "8", observacoes: "Sintomas persistentes e agravantes", paciente: "João Silva", psicologo: "Dra. Maria Oliveira"},
  ];

  public chart = {
    title: "Níveis de sintomas depressivos (2025)",
    type: ChartType.LineChart,
    data: this.avaliacoes.map(avaliacao => [avaliacao.data, Number(avaliacao.risco)]),
    columnNames: ["Testes", "nível"],
    options: {},
    width: 500,
    height: 200
  };

  getSeverity(): number {
    const severity = this.chart.data.at(-1)?.[1];
    return typeof severity === 'number' ? severity : 0;
  }

}
