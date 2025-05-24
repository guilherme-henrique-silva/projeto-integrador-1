import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliacoes',
  imports: [TopNavbarComponent],
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.css'
})
export class AvaliacoesComponent {

  userId: string | null;
  userRole: string | null;

  constructor(private auth: AuthService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

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
