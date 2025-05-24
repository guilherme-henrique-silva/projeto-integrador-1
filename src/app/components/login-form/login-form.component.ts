import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements AfterViewInit {

  emailInput = '';
  passwordInput = '';
  roleRadio = '';
  crpInput = '';
  
  userId: string = 'asd@asd';
  userRole: string = 'psicologo';
  isCheckedPsicologo: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnLogin = document.querySelector<HTMLFormElement>('#btnLogin');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    addEventListener("submit", (event) => {
      this.login();
    })
  }

  onChange() {
    this.isCheckedPsicologo = !this.isCheckedPsicologo;
  }

  login() {
    if(this.emailInput !== this.userId) {
      console.log(this.emailInput);
      console.log(this.passwordInput);
      console.log(this.roleRadio);
      console.log(this.crpInput);
      this.auth.login(this.emailInput, this.roleRadio);
      this.router.navigate(['/home']);
    } else {
      console.log('Já existe esse usuário!')
    }
  }

}
