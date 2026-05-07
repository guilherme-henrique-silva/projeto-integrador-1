import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Nomes das chaves no LocalStorage (centralizado)
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID = 'user_id';
  private readonly USER_ROLE = 'user_role';
  private readonly USER_NOME = 'user_nome';

  private router = inject(Router);
  private loginService = inject(LoginService);

  login(credentials: { username: string; password: string }) {
    return this.loginService.login(credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_ID, response.id.toString());
        localStorage.setItem(this.USER_ROLE, response.role);
        localStorage.setItem(this.USER_NOME, response.nome);
      })
    );
  }

  logout() {
    localStorage.clear(); // Limpa tudo de uma vez para segurança
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    // Uma checagem extra: o token existe e não é uma string vazia?
    return !!token && token.length > 10; 
  }

  getToken() { return localStorage.getItem(this.TOKEN_KEY); }
  getUserId() { return localStorage.getItem(this.USER_ID); }
  getUserRole() { return localStorage.getItem(this.USER_ROLE); }
  getUserNome() { return localStorage.getItem(this.USER_NOME); }
}