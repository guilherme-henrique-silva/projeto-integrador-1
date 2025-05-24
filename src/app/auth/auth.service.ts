import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(userId: string, userRole: string) {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userRole', userRole);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userId');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }
}
