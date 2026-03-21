import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginDto, LoginResponse } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlLogin = 'https://punto-venta-backend-hphi.onrender.com/auth/login';
  private http = inject(HttpClient);
  private router = inject(Router);

  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check if token exists on init
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: LoginDto) {
    this.http.post<LoginResponse>(this.urlLogin, credentials).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.isAuthenticated.set(true);
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error(err);
        alert('Error en login, credenciales incorrectas');
      }
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

}
