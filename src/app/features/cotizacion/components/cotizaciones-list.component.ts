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
      margin-bottom: 3rem;
      display: flex;
      justify-content: flex-start;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }
    .quote-card {
      padding: 2rem;
      border-radius: 4px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .client-name {
      font-size: 1.1rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .data-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 0.5rem;
    }
    .label {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }
    .value {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .cuota {
      color: var(--text-primary);
      font-weight: 800;
    }
    .card-footer {
      margin-top: 2rem;
    }
    .btn-outline {
      width: 100%;
      background: transparent;
      border: 1px solid var(--text-secondary);
      color: var(--text-primary);
      padding: 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 1px;
    }
    .btn-outline:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.05);
    }
    .empty-state {
      grid-column: 1 / -1;
      padding: 5rem;
      text-align: center;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.8rem;
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
