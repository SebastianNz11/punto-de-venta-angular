import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const isAuthenticated = authService.isAuthenticated() || !!token;

  if (isAuthenticated) {
    router.navigate(['/clientes']);
    return false;
  }

  return true;
};
