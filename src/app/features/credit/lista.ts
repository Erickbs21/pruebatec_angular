import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CotizacionService } from '../../core/services/cotizacion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-12 py-12">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div class="max-w-xl">
          <h1 class="serif-title text-5xl mb-4 text-editorial-text uppercase not-italic font-black tracking-tighter">Historial<span class="font-light italic block mt-1">de Cotizaciones</span></h1>
          <p class="text-editorial-muted text-sm leading-relaxed">Registro cronológico de proyecciones financieras realizadas para financiamiento de motocicletas.</p>
        </div>
        <a routerLink="/nueva-cotizacion" 
           class="editorial-btn">
          Nueva Proyección
        </a>
      </div>

      @if (cotizaciones().length === 0) {
        <div class="editorial-card p-24 text-center">
          <h3 class="serif-title text-3xl text-editorial-text mb-4 italic">Archivo vacío</h3>
          <p class="text-editorial-muted max-w-xs mx-auto mb-8 font-light">
            No se han generado proyecciones en el periodo actual.
          </p>
          <a routerLink="/nueva-cotizacion" class="micro-label text-editorial-text border-b border-editorial-text pb-1">
            Iniciar primera cotización
          </a>
        </div>
      } @else {
        <div class="editorial-card overflow-hidden">
          <div class="p-8 border-b border-editorial-border flex justify-between items-center bg-zinc-50/50">
            <h3 class="micro-label text-editorial-text">Registros Recientes</h3>
            <span class="text-[10px] text-editorial-muted font-mono italic">Ref: {{ hoy | date:'yyyy' }}-AF</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="micro-label border-b border-editorial-border">
                  <th class="px-8 py-4 font-normal">ID Referencia</th>
                  <th class="px-8 py-4 font-normal">Cliente</th>
                  <th class="px-8 py-4 font-normal">Monto (Q)</th>
                  <th class="px-8 py-4 font-normal">Plazo</th>
                  <th class="px-8 py-4 font-normal">Cuota Mensual</th>
                  <th class="px-8 py-4 font-normal">Acciones</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-editorial-border">
                @for (c of cotizaciones(); track c.id) {
                  <tr class="hover:bg-zinc-50 transition-colors">
                    <td class="px-8 py-6 font-mono text-xs text-editorial-muted italic">#{{ c.id.slice(0, 8) }}</td>
                    <td class="px-8 py-6 font-medium text-editorial-text">{{ c.nombreCliente }}</td>
                    <td class="px-8 py-6 text-editorial-text">Q {{ c.montoSolicitado | number:'1.2-2' }}</td>
                    <td class="px-8 py-6 text-editorial-muted">{{ c.plazoMeses }} m</td>
                    <td class="px-8 py-6 font-bold text-editorial-text italic">Q {{ c.cuotaMensual | number:'1.2-2' }}</td>
                    <td class="px-8 py-6">
                      <a [routerLink]="['/detalle', c.id]" 
                         class="micro-label text-emerald-600 hover:text-emerald-800 transition-colors">
                        Ver Detalles
                      </a>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class Lista {
  private cotizacionService = inject(CotizacionService);
  cotizaciones = this.cotizacionService.cotizaciones;
  hoy = new Date();
}
