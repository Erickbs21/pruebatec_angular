import { Routes } from '@angular/router';
import { NuevaCotizacionComponent } from './features/cotizacion/components/nueva-cotizacion.component';
import { CotizacionesListComponent } from './features/cotizacion/components/cotizaciones-list.component';
import { DetalleCotizacionComponent } from './features/cotizacion/components/detalle-cotizacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'nueva', pathMatch: 'full' },
  { path: 'nueva', component: NuevaCotizacionComponent },
  { path: 'listado', component: CotizacionesListComponent },
  { path: 'detalle/:id', component: DetalleCotizacionComponent },
  { path: '**', redirectTo: 'nueva' }
];
