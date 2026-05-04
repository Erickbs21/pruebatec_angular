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
          <h2 class="form-title">Datos del Préstamo</h2>
          
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
              <span>Cuota Estimada:</span>
              <span class="value">Q {{ cuotaEstimada }}</span>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full" [disabled]="cotizacionForm.invalid">
            Calcular y Guardar
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
      padding: 2.5rem;
    }
    .form-title {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      color: var(--primary-color);
    }
    .w-full {
      width: 100%;
      margin-top: 1rem;
    }
    .summary-preview {
      background: rgba(99, 102, 241, 0.1);
      border: 1px dashed var(--primary-color);
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      animation: fadeIn 0.3s ease;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .summary-item .value {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--accent-success);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
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
      monto: [null, [Validators.required, Validators.min(1000)]],
      tasaInteresAnual: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      plazoMeses: [null, [Validators.required, Validators.min(1), Validators.max(120)]]
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
      if (control.errors['min']) return `Valor mínimo: ${control.errors['min'].min}`;
      if (control.errors['max']) return `Valor máximo: ${control.errors['max'].max}`;
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
      this.router.navigate(['/listado']);
    }
  }
}
