import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionService } from '../../../core/services/cotizacion.service';
import { CustomInputComponent } from '../../../shared/components/custom-input.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-nueva-cotizacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent, PageHeaderComponent],
  template: `
    <app-page-header title="Nueva Cotización"></app-page-header>
    
    <main class="container">
      <div class="glass-card form-container">
        <form [formGroup]="cotizacionForm" (ngSubmit)="onSubmit()">
          <h2 class="form-title">Datos de la Cotización</h2>
          
          <app-custom-input
            label="Nombre del Cliente"
            placeholder="Ej. Juan Pérez"
            type="text"
            formControlName="nombreCliente"
            [error]="getErrorMessage('nombreCliente')"
          ></app-custom-input>

          <app-custom-input
            label="Monto del Préstamo"
            placeholder="Ej. 15000"
            type="number"
            prefix="Q"
            formControlName="monto"
            [error]="getErrorMessage('monto')"
          ></app-custom-input>

          <app-custom-input
            label="Tasa de Interés Anual (%)"
            placeholder="Ej. 12"
            type="number"
            formControlName="tasaInteresAnual"
            [error]="getErrorMessage('tasaInteresAnual')"
          ></app-custom-input>

          <app-custom-input
            label="Plazo (Meses)"
            placeholder="Ej. 24"
            type="number"
            formControlName="plazoMeses"
            [error]="getErrorMessage('plazoMeses')"
          ></app-custom-input>

          <div class="summary-preview" *ngIf="cotizacionForm.valid">
            <div class="summary-item">
              <span>Cuota Mensual Proyectada:</span>
              <span class="value">Q {{ cuotaEstimada }}</span>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full" [disabled]="cotizacionForm.invalid">
            Calcular y Guardar Cotización
          </button>
        </form>
      </div>
    </main>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 1rem 4rem;
    }
    .form-container {
      padding: 3rem;
      border-radius: 0;
    }
    .form-title {
      margin-bottom: 2.5rem;
      font-size: 1.2rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-primary);
      border-left: 4px solid var(--accent-blue);
      padding-left: 1rem;
    }
    .w-full {
      width: 100%;
      margin-top: 2rem;
    }
    .summary-preview {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--glass-border);
      padding: 1.5rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .summary-item span:first-child {
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .summary-item .value {
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--text-primary);
    }
  `]
})
export class NuevaCotizacionComponent implements OnInit {
  cotizacionForm!: FormGroup;
  cuotaEstimada: number = 0;

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cotizacionForm = this.fb.group({
      nombreCliente: ['', [
        Validators.required, 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
      ]],
      monto: [null, [
        Validators.required, 
        Validators.min(0.01), 
        Validators.max(60000)
      ]],
      tasaInteresAnual: [null, [
        Validators.required, 
        Validators.min(0), 
        Validators.max(20)
      ]],
      plazoMeses: [null, [
        Validators.required, 
        Validators.min(1), 
        Validators.max(60)
      ]]
    });

    this.cotizacionForm.valueChanges.subscribe(val => {
      if (this.cotizacionForm.valid) {
        this.cuotaEstimada = this.cotizacionService.calcularCuotaMensual(
          val.monto,
          val.tasaInteresAnual,
          val.plazoMeses
        );
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.cotizacionForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['pattern']) return 'Solo se permiten caracteres alfabéticos';
      if (control.errors['min']) return `Valor mínimo: ${control.errors['min'].min}`;
      if (control.errors['max']) return `Valor máximo permitido: ${control.errors['max'].max}`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.cotizacionForm.valid) {
      const formVal = this.cotizacionForm.value;
      this.cotizacionService.guardarCotizacion({
        ...formVal,
        cuotaMensual: this.cuotaEstimada
      });
      this.router.navigate(['/cotizaciones']);
    }
  }
}
