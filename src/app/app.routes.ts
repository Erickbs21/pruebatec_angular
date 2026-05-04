import { Routes } from '@angular/router';
import { NuevaCotizacionComponent } from './features/cotizacion/components/nueva-cotizacion.component';
import { CotizacionesListComponent } from './features/cotizacion/components/cotizaciones-list.component';
import { DetalleCotizacionComponent } from './features/cotizacion/components/detalle-cotizacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cotizaciones', pathMatch: 'full' },
  { path: 'cotizaciones', component: CotizacionesListComponent },
  { path: 'nueva-cotizacion', component: NuevaCotizacionComponent },
  { path: 'detalle/:id', component: DetalleCotizacionComponent },
  { path: '**', redirectTo: 'cotizaciones' }
];
