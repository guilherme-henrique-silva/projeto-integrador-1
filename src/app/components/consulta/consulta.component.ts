import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { Router } from '@angular/router';
import { ConsultaFormComponent } from '../consulta-form/consulta-form.component';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, TopNavbarComponent, ConsultaFormComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  
  userId: string | null;
  userRole: string | null;

  alertMessage: string | null = null;
  alertClass: string = '';

  constructor(private auth: AuthService, private router: Router) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  handleRegisterEvent(event: { success: boolean; message: string }) {
    this.alertMessage = event.message;
    this.alertClass = event.success ? 'alert-success' : 'alert-danger';
  }
}
