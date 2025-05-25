import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [TopNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userId: string | null;
  userRole: string | null;
  userNome: string | null;

  constructor(private auth: AuthService) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
    this.userNome = this.auth.getUserNome();
  }

}
