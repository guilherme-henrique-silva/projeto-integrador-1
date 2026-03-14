import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { AuthService } from '../../auth/auth.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-progresso',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule, TopNavbarComponent],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.css'
})
export class ProgressoComponent implements OnInit {
  private avaliacaoService = inject(AvaliacaoService);
  private auth = inject(AuthService);
  

  public chart = {
    title: "",
    type: ChartType.LineChart,
    data: [] as any[][],
    columnNames: ["Sessão", "Bem-estar"],
    options: {
      colors: ['#0d6efd'],
      curveType: 'function',
      chartArea: { width: '85%', height: '70%' },
      vAxis: { minValue: 0, maxValue: 10, gridlines: { count: 6 } },
      hAxis: { textStyle: { fontSize: 11 } },
      legend: { position: 'none' },
      pointSize: 8,
      lineWidth: 3
    }

    
  };

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (userId) {
      this.avaliacaoService.getProgresso(userId).subscribe({
        next: (dados: any[]) => {
          this.chart.data = [...dados];
        },
        error: (err) => console.error('Erro ao buscar dados:', err)
      });
    }
  }

  getSeverity(): number {
    if (this.chart.data?.length > 0) {
      return this.chart.data[this.chart.data.length - 1][1];
    }
    return 0;
  }

  // Helper para centralizar as cores e ícones do status

}