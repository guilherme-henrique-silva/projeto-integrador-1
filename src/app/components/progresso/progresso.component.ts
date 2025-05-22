import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-progresso',
  imports: [TopNavbarComponent, GoogleChartsModule],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.css'
})
export class ProgressoComponent {

  public chart = {
    title: "Níveis de sintomas depressivos (2025)",
    type: ChartType.LineChart,
    data: [
      ["Teste 1", 5],
      ["Teste 2", 6],
      ["Teste 3", 5],
      ["Teste 4", 7],
      ["Teste 5", 8],
      ["Teste 6", 8]
    ],
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
