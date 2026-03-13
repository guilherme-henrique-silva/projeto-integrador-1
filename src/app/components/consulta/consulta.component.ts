import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConsultaFormComponent } from '../consulta-form/consulta-form.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, ConsultaFormComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  userId: string | null = null;
  userRole: string | null = null;
  alertMessage: string | null = null;
  alertClass: string = '';

  // O Router permanece private para encapsulamento
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  // Método público para o botão "Voltar"
  voltarHome(): void {
    this.router.navigate(['/home']);
  }

  handleRegisterEvent(event: { success: boolean; message: string }) {
    this.alertMessage = event.message;
    this.alertClass = event.success ? 'alert-success border-success' : 'alert-danger border-danger';

    // Timer para limpar o alerta automaticamente
    setTimeout(() => this.alertMessage = null, 5000);
  }
}