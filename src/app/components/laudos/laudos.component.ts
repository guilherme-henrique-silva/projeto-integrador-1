import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-laudos',
  imports: [TopNavbarComponent, NgFor, NgIf],
  templateUrl: './laudos.component.html',
  styleUrl: './laudos.component.css'
})
export class LaudosComponent {

  nomePaciente = 'Fulano da Silva';

  tableColumns = ['Data', 'Descrição', 'CID', '', ''];

  laudosPaciente = [
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
