import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-avaliacoes',
  imports: [TopNavbarComponent],
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.css'
})
export class AvaliacoesComponent {

  user = {
    name: 'Fulano da Silva',
    context: 'paciente'
  }
  nomePaciente = 'Fulano da Silva';

  tableColumns = ['Data', 'Descrição', 'CID', '', ''];

  avaliacoesPaciente = [
    {
      data: '13/01/2025',
      descricao: 'Depressão',
      cid: 'F32.0'
    },
    {
      data: '10/02/2025',
      descricao: 'Depressão',
      cid: 'F32.0'
    },
    {
      data: '10/03/2025',
      descricao: 'Depressão',
      cid: 'F32.1'
    }
  ];

}
