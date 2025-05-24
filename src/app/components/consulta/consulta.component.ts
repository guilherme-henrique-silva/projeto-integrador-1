import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { Router } from '@angular/router';
import { ConsultaFormComponent } from '../consulta-form/consulta-form.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consulta',
  imports: [TopNavbarComponent, ConsultaFormComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  
  userId: string | null;
  userRole: string | null;

  constructor(private auth: AuthService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }
}
