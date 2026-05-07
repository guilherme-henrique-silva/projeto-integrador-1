import { AfterViewInit, Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  alertMessage: string | null = null;
  alertClass: string = '';

  handleRegisterEvent(event: { success: boolean; message: string }) {
    this.alertMessage = event.message;
    this.alertClass = event.success ? 'alert-success' : 'alert-danger';
    setTimeout(() => {
      this.alertMessage = null;
      this.alertClass = '';
    }, 3000);
  }

}
