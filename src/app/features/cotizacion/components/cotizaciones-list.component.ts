import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CotizacionService } from '../../../core/services/cotizacion.service';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import { Cotizacion } from '../../../core/models/cotizacion.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cotizaciones-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  template: `
    <app-page-header title="Historial de Cotizaciones"></app-page-header>
    
    <main class="container">
      <div class="actions">
        <button class="btn-primary" routerLink="/nueva-cotizacion">Nueva Cotización</button>
      </div>

      <div class="grid" *ngIf="cotizaciones$ | async as cotizaciones">
        <div class="glass-card empty-state" *ngIf="cotizaciones.length === 0">
          <p>No hay cotizaciones guardadas aún.</p>
        </div>

        <div class="glass-card quote-card" *ngFor="let c of cotizaciones">
          <div class="card-header">
            <span class="date">{{ c.fechaCreacion | date:'dd/MM/yyyy HH:mm' }}</span>
            <span class="id">ID: {{ c.id?.split('-')?.at(0) }}</span>
          </div>
          <div class="card-body">
            <h3 class="client-name">{{ c.nombreCliente }}</h3>
            <div class="data-row">
              <span class="label">Monto:</span>
              <span class="value">Q {{ c.monto }}</span>
            </div>
            <div class="data-row">
              <span class="label">Cuota Mensual:</span>
              <span class="value cuota">Q {{ c.cuotaMensual }}</span>
            </div>
            <div class="data-row">
              <span class="label">Plazo:</span>
              <span class="value">{{ c.plazoMeses }} meses</span>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn-outline" [routerLink]="['/detalle', c.id]">
              Ver Amortización
            </button>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1rem 4rem;
    }
    .actions {
      margin-bottom: 2rem;
      display: flex;
      justify-content: flex-end;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .quote-card {
      padding: 1.5rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--glass-border);
      padding-bottom: 0.5rem;
    }
    .client-name {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    .data-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .label {
      color: var(--text-secondary);
    }
    .value {
      font-weight: 600;
    }
    .cuota {
      color: var(--accent-success);
      font-size: 1.1rem;
    }
    .card-footer {
      margin-top: 1.5rem;
    }
    .btn-outline {
      width: 100%;
      background: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      padding: 0.6rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }
    .btn-outline:hover {
      background: var(--primary-color);
      color: white;
    }
    .empty-state {
      grid-column: 1 / -1;
      padding: 4rem;
      text-align: center;
      color: var(--text-secondary);
    }
  `]
})
export class CotizacionesListComponent implements OnInit {
  cotizaciones$!: Observable<Cotizacion[]>;

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.cotizaciones$ = this.cotizacionService.cotizaciones$;
  }
}
