import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CotizacionService } from '../../core/services/cotizacion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-12 py-12">
      <div class="mb-12 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <a routerLink="/cotizaciones" class="hover:text-editorial-text text-editorial-muted transition-colors">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="serif-title text-4xl text-editorial-text italic">Certificado de Cotización</h1>
        </div>
        <div class="flex gap-4 no-print">
          <button (click)="imprimir()" class="editorial-btn !bg-white !text-editorial-text border border-editorial-border hover:!bg-zinc-50 flex items-center gap-2">
            <mat-icon class="scale-75">print</mat-icon>
            Imprimir registro
          </button>
        </div>
      </div>

      @if (cotizacion(); as c) {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Columna Izquierda: Información -->
          <div class="lg:col-span-8 space-y-12">
            <div class="editorial-card p-12 relative overflow-hidden">
              <div class="relative z-10">
                <header class="flex justify-between items-start mb-16">
                  <div>
                    <span class="micro-label mb-2 block">Referencia Bancaria</span>
                    <h2 class="text-xs font-mono text-editorial-muted uppercase tracking-widest italic">COT-{{ c.id.slice(0, 8) }}</h2>
                  </div>
                  <div class="text-right">
                    <span class="micro-label mb-2 block">Fecha de Emisión</span>
                    <span class="text-sm font-medium">{{ c.fechaCreacion | date:'dd.MM.yyyy' }}</span>
                  </div>
                </header>

                <div class="mb-20">
                  <span class="micro-label mb-4 block">Nombre del Solicitante</span>
                  <h3 class="serif-title text-5xl text-editorial-text not-italic uppercase font-black tracking-tighter">
                    {{ c.nombreCliente }}
                  </h3>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-12">
                  <div>
                    <span class="micro-label mb-2 block">Monto Solicitado</span>
                    <p class="text-2xl font-bold text-editorial-text">Q {{ c.montoSolicitado | number:'1.2-2' }}</p>
                  </div>
                  <div>
                    <span class="micro-label mb-2 block">Plazo de Crédito</span>
                    <p class="text-2xl font-bold text-editorial-text">{{ c.plazoMeses }} Meses</p>
                  </div>
                  <div>
                    <span class="micro-label mb-2 block">Tasa de Interés</span>
                    <p class="text-2xl font-bold text-editorial-text">{{ c.tasaInteres }}% <span class="text-[10px] uppercase font-normal opacity-50 block">Anual</span></p>
                  </div>
                  <div>
                    <span class="micro-label mb-2 block">Status</span>
                    <p class="text-sm font-bold uppercase tracking-widest text-emerald-600 italic">Vigente</p>
                  </div>
                </div>
              </div>
              
              <!-- Elemento decorativo editorial -->
              <div class="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
                <mat-icon class="text-[300px] h-[300px] w-[300px]">account_balance</mat-icon>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="editorial-card p-8 bg-zinc-50/50">
                <h4 class="micro-label mb-6 border-b border-editorial-border pb-4">Detalle de Cargos</h4>
                <div class="space-y-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-editorial-muted">Capital Principal</span>
                    <span class="font-mono">Q {{ c.montoSolicitado | number:'1.2-2' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-editorial-muted">Interés Proyectado</span>
                    <span class="font-mono">Q {{ (c.cuotaMensual * c.plazoMeses - c.montoSolicitado) | number:'1.2-2' }}</span>
                  </div>
                  <div class="flex justify-between text-sm pt-4 border-t border-editorial-border">
                    <span class="font-bold text-editorial-text">Monto Total</span>
                    <span class="font-mono font-bold">Q {{ (c.cuotaMensual * c.plazoMeses) | number:'1.2-2' }}</span>
                  </div>
                </div>
              </div>

              <div class="editorial-card p-8 flex flex-col justify-center border-l-4 border-l-editorial-text italic">
                <p class="text-sm text-editorial-text leading-relaxed">
                  "El cálculo de la cuota se realiza mediante el sistema francés de amortización, garantizando pagos fijos durante toda la vida del crédito seleccionado."
                </p>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Cuotas -->
          <div class="lg:col-span-4 self-start">
            <div class="editorial-card p-10 bg-editorial-text text-white relative overflow-hidden">
               <div class="relative z-10">
                  <span class="micro-label !text-zinc-400 mb-6 block">Inversión Mensual</span>
                  <div class="mb-8">
                    <div class="text-6xl font-black tracking-tighter italic">
                      Q {{ c.cuotaMensual | number:'1.0-0' }}<span class="text-2xl font-light opacity-50">.{{ (c.cuotaMensual % 1 * 100) | number:'2.0-0' }}</span>
                    </div>
                    <span class="text-xs uppercase tracking-widest font-bold opacity-60">Pago mensual nivelado</span>
                  </div>
                  

                  <a routerLink="/nueva-cotizacion" class="mt-12 block text-center py-4 border border-white/20 hover:bg-white/5 transition-colors uppercase text-[10px] font-bold tracking-[0.2em]">
                    Nueva Simulación
                  </a>
               </div>
               
               <!-- Gráfico de fondo -->
               <div class="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      } @else {
        <div class="editorial-card p-24 text-center">
          <mat-icon class="text-editorial-muted text-6xl h-16 w-16 mb-6">history_edu</mat-icon>
          <h2 class="serif-title text-3xl italic mb-4">Registro inexistente</h2>
          <p class="text-editorial-muted max-w-sm mx-auto mb-10 leading-relaxed font-light">
            La cotización solicitada no se encuentra en nuestros archivos maestros. Por favor verifique la referencia.
          </p>
          <a routerLink="/cotizaciones" class="editorial-btn">
            Ir al Historial
          </a>
        </div>
      }
    </div>
  `
})
export class Detalle {
  id = input.required<string>();
  private cotizacionService = inject(CotizacionService);

  cotizacion = () => this.cotizacionService.obtenerPorId(this.id());

  imprimir() {
    window.print();
  }
}
