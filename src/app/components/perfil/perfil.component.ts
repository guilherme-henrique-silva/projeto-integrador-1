import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { PerfilFormComponent } from '../perfil-form/perfil-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, TopNavbarComponent, PerfilFormComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  alertMessage: string | null = null;
  alertClass: string = '';

  handleRegisterEvent(event: { success: boolean; message: string }) {
    this.alertMessage = event.message;
    this.alertClass = event.success ? 'alert-success' : 'alert-danger';
  }

}
