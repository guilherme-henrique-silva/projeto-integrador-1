import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { AuthService } from '../../auth/auth.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-progresso',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule, TopNavbarComponent, FormsModule],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.css'
})
export class ProgressoComponent implements OnInit {
  private avaliacaoService = inject(AvaliacaoService);
  private auth = inject(AuthService);

  userRole: string | null = null;
  pacientes: any[] = [];
  selectedPacienteId: string | number = '';
  isLoading = false;

  public chart = {
    title: "",
    type: ChartType.LineChart,
    data: [] as any[][],
    columnNames: ["Sessão", "Bem-estar"],
    options: {
      colors: ['#0d6efd'],
      curveType: 'function',
      chartArea: { width: '85%', height: '75%' },
      vAxis: { minValue: 0, maxValue: 10, gridlines: { count: 6 } },
      hAxis: { textStyle: { fontSize: 11 } },
      legend: { position: 'none' },
      pointSize: 8,
      lineWidth: 3,
      animation: { duration: 1000, easing: 'out' }
    }
  };

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();

    if (this.userRole === 'psicologo') {
      this.carregarPacientes();
    } else if (this.userRole === 'paciente') {
      // Forçamos o carregamento dos dados do próprio paciente
      this.atualizarGrafico('me');
    }
  }

  carregarPacientes(): void {
    this.avaliacaoService.listarTodosPacientes().subscribe({
      next: (res) => {
        this.pacientes = res;
      },
      error: (err) => console.error('Erro ao buscar lista de pacientes', err)
    });
  }

  atualizarGrafico(id: string | number): void {
    if (!id) {
      this.chart.data = [];
      return;
    }

    this.isLoading = true;
    // O ID 'me' será tratado pelo backend para identificar o paciente pelo Token
    this.avaliacaoService.getProgresso(id).subscribe({
      next: (dados: any[]) => {
        // Garantimos que os dados existam antes de atribuir
        this.chart.data = dados && dados.length > 0 ? [...dados] : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do gráfico:', err);
        this.chart.data = [];
        this.isLoading = false;
      }
    });
  }

  getSeverity(): number {
    if (this.chart.data && this.chart.data.length > 0) {
      // Pega o valor da última entrada no gráfico
      const ultimaEntrada = this.chart.data[this.chart.data.length - 1];
      return ultimaEntrada[1]; 
    }
    return 0;
  }
}