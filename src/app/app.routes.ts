import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login-page/login-page')
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes-page/clientes-page')
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios-page/usuarios-page')
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos-page/productos-page')
  },
  {
    path: 'ventas',
    loadComponent: () => import('./pages/ventas-page/ventas-page')
  },
  {
    path: 'detalle-ventas',
    loadComponent: () => import('./pages/detalle-ventas-page/detalle-ventas-page')
  }
];
