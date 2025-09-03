import { Routes } from '@angular/router';

// @ts-ignore
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component').then(r => r.LoginComponent),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./modules/administration/administration.routes').then(r => r.router),
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
