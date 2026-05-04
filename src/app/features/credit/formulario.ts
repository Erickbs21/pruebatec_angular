import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionService } from '../../core/services/cotizacion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-12 py-12 grid grid-cols-1 md:grid-cols-12 gap-16">
      <section class="md:col-span-5 flex flex-col justify-between">
        <header>
          <h1 class="serif-title text-6xl mb-6 text-editorial-text italic leading-tight">Cotizador de<br>Préstamos</h1>
          <p class="text-editorial-muted text-sm leading-relaxed max-w-xs">Ingrese los parámetros del crédito para proyectar el plan de pagos bajo el sistema francés de amortización.</p>
        </header>

        <form [formGroup]="form" (ngSubmit)="enviar()" class="space-y-10 mt-12">
          <!-- Nombre del Cliente -->
          <div class="relative">
            <label for="nombreCliente" class="micro-label">Nombre del Cliente</label>
            <input id="nombreCliente" type="text" formControlName="nombreCliente"
                   placeholder="Ej. Juan Pérez"
                   class="editorial-input"
                   [class.border-red-300]="error('nombreCliente')">
            @if (error('nombreCliente')) {
              <p class="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-widest leading-none">Solo caracteres alfabéticos</p>
            }
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <!-- Monto Solicitado -->
            <div class="relative">
              <label for="montoSolicitado" class="micro-label">Monto Solicitado (Q)</label>
              <input id="montoSolicitado" type="number" formControlName="montoSolicitado"
                     placeholder="0.00"
                     class="editorial-input"
                     [class.border-red-300]="error('montoSolicitado')">
              @if (error('montoSolicitado')) {
                <p class="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-widest leading-none">Máx. Q 60,000</p>
              }
            </div>

            <!-- Tasa de Interés -->
            <div class="relative">
              <label for="tasaInteres" class="micro-label">Tasa Anual (%)</label>
              <input id="tasaInteres" type="number" formControlName="tasaInteres"
                     placeholder="0.00"
                     class="editorial-input"
                     [class.border-red-300]="error('tasaInteres')">
              @if (error('tasaInteres')) {
                <p class="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-widest leading-none">Rango 0 - 20%</p>
              }
            </div>
          </div>

          <!-- Plazo -->
          <div class="relative">
            <label for="plazoMeses" class="micro-label">Plazo (Meses)</label>
            <input id="plazoMeses" type="number" formControlName="plazoMeses"
                   placeholder="Ej. 12"
                   class="editorial-input"
                   [class.border-red-300]="error('plazoMeses')">
            @if (error('plazoMeses')) {
              <p class="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-widest leading-none">Máximo 60 meses</p>
            }
          </div>

          <button type="submit" 
                  [disabled]="form.invalid"
                  class="editorial-btn w-full mt-4">
            Generar Proyección
          </button>
        </form>
      </section>

      <section class="md:col-span-7 flex flex-col space-y-8">
        <!-- Tarjeta de Resultado -->
        <div class="editorial-card p-12 flex items-center justify-between">
          <div class="flex flex-col">
            <span class="micro-label mb-4">Cuota Mensual Estimada</span>
            <span class="text-7xl font-bold tracking-tighter text-editorial-text italic">
              Q {{ cuotaEntera }}<span class="text-3xl font-light opacity-50">.{{ cuotaDecimal }}</span>
            </span>
          </div>
          <div class="text-right border-l border-editorial-border pl-12 hidden lg:block">
            <div class="mb-6">
              <span class="micro-label block mb-1">Total a Pagar</span>
              <span class="text-2xl font-bold text-editorial-text">Q {{ totalPagar | number:'1.2-2' }}</span>
            </div>
            <div>
              <span class="micro-label block mb-1 text-red-500">Intereses Totales</span>
              <span class="text-2xl text-red-500 font-medium italic">Q {{ totalIntereses | number:'1.2-2' }}</span>
            </div>
          </div>
        </div>

        <!-- Vista previa de Tabla -->
        <div class="editorial-card overflow-hidden flex-grow opacity-40 grayscale flex flex-col items-center justify-center p-12 text-center select-none bg-zinc-50/50 border-dashed">
          <mat-icon class="text- editorial-muted text-6xl h-16 w-16 mb-4">analytics</mat-icon>
          <h3 class="micro-label text-editorial-text mb-2">Simulación de Amortización</h3>
          <p class="text-[10px] uppercase tracking-widest text-editorial-muted">Complete los datos para visualizar el plan detallado</p>
        </div>
      </section>
    </div>
  `
})
export class Formulario {
  private fb = inject(FormBuilder);
  private cotizacionService = inject(CotizacionService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    nombreCliente: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
    montoSolicitado: [null, [Validators.required, Validators.min(1), Validators.max(60000)]],
    tasaInteres: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
    plazoMeses: [null, [Validators.required, Validators.min(1), Validators.max(60)]]
  });

  get cuotaActual(): number {
    const { montoSolicitado, tasaInteres, plazoMeses } = this.form.value;
    return this.cotizacionService.calcularCuota(
      montoSolicitado || 0,
      tasaInteres || 0,
      plazoMeses || 0
    );
  }

  get cuotaEntera(): string {
    return Math.floor(this.cuotaActual).toLocaleString();
  }

  get cuotaDecimal(): string {
    const decimal = Math.round((this.cuotaActual % 1) * 100);
    return decimal < 10 ? '0' + decimal : decimal.toString();
  }

  get totalPagar(): number {
    const plazo = this.form.get('plazoMeses')?.value || 0;
    return this.cuotaActual * plazo;
  }

  get totalIntereses(): number {
    const monto = this.form.get('montoSolicitado')?.value || 0;
    return Math.max(0, this.totalPagar - monto);
  }

  error(control: string): boolean {
    const field = this.form.get(control);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  enviar() {
    if (this.form.valid) {
      this.cotizacionService.agregarCotizacion(this.form.value);
      this.router.navigate(['/cotizaciones']);
    }
  }
}
