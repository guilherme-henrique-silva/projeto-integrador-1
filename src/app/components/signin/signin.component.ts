import { Component } from '@angular/core';
import { SigninFormComponent } from '../signin-form/signin-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, SigninFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

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
