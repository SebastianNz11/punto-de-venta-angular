import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login-page/login-page')
  },
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/clientes-page/clientes-page')
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/usuarios-page/usuarios-page')
  },
  {
    path: 'productos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/productos-page/productos-page')
  },
  {
    path: 'ventas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/ventas-page/ventas-page')
  },
  {
    path: 'detalle-ventas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/detalle-ventas-page/detalle-ventas-page')
  }
];
