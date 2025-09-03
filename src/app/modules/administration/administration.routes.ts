import { Routes } from '@angular/router';

export const router: Routes = [

  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('../administration/pages/main/main.component').then(c => c.MainComponent),
  },

];
