import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'payment-management',
        pathMatch: 'full',
    },
    {
        path: 'payment-management',
        loadComponent: () => import('./modules/payment/pages/payment/payment.component').then(r => r.PaymentComponent),
    },
    {
        path: '**',
        redirectTo: 'payment-management',
        pathMatch: 'full'
    }
];
