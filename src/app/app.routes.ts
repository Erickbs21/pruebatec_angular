import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cotizaciones', pathMatch: 'full' },
  { 
    path: 'cotizaciones', 
    loadComponent: () => import('./features/credit/lista').then(m => m.Lista) 
  },
  { 
    path: 'nueva-cotizacion', 
    loadComponent: () => import('./features/credit/formulario').then(m => m.Formulario) 
  },
  { 
    path: 'detalle/:id', 
    loadComponent: () => import('./features/credit/detalle').then(m => m.Detalle) 
  },
  { path: '**', redirectTo: 'cotizaciones' }
];
