import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userId: string = 'user_id';
  userRole: string = 'user_role';
  userNome: string = 'user_nome';
  private tokenKey = 'auth_token';

  constructor(private loginService: LoginService, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.loginService.login(credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userId, response.id.toString());
        localStorage.setItem(this.userRole, response.role);
        localStorage.setItem(this.userNome, response.nome);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userId);
    localStorage.removeItem(this.userRole);
    localStorage.removeItem(this.userNome);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userId);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRole);
  }

  getUserNome(): string | null {
    return localStorage.getItem(this.userNome);
  }
}
