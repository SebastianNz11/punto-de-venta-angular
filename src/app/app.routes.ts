import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes-page/clientes-page')
  }
];
