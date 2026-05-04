import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CotizacionService } from '../../../core/services/cotizacion.service';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import { Cotizacion, DetalleCuota } from '../../../core/models/cotizacion.model';

@Component({
  selector: 'app-detalle-cotizacion',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  template: `
    <app-page-header title="Detalle de Amortización"></app-page-header>
    
    <main class="container" *ngIf="cotizacion">
      <div class="glass-card summary-card">
        <h2 class="client-title">{{ cotizacion.nombreCliente }}</h2>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Monto Solicitado</span>
            <span class="value">Q {{ cotizacion.monto }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Plazo</span>
            <span class="value">{{ cotizacion.plazoMeses }} Meses</span>
          </div>
          <div class="summary-item">
            <span class="label">Tasa Anual</span>
            <span class="value">{{ cotizacion.tasaInteresAnual }}%</span>
          </div>
          <div class="summary-item">
            <span class="label">Cuota Mensual</span>
            <span class="value highlight">Q {{ cotizacion.cuotaMensual }}</span>
          </div>
        </div>
      </div>

      <div class="glass-card table-container">
        <table>
          <thead>
            <tr>
              <th>Cuota</th>
              <th>Capital</th>
              <th>Interés</th>
              <th>Monto Cuota</th>
              <th>Saldo Restante</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cuota of tabla">
              <td>{{ cuota.numeroCuota }}</td>
              <td>Q {{ cuota.capital }}</td>
              <td>Q {{ cuota.interes }}</td>
              <td class="font-bold">Q {{ cuota.montoCuota }}</td>
              <td class="text-secondary">Q {{ cuota.saldoRestante }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <button class="btn-primary" routerLink="/cotizaciones">Volver al Historial</button>
      </div>
    </main>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1rem 4rem;
    }
    .summary-card {
      padding: 2rem;
      margin-bottom: 2rem;
    }
    .client-title {
      margin-bottom: 1.5rem;
      color: var(--primary-color);
      font-size: 1.8rem;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .label {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .value {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .highlight {
      color: var(--accent-success);
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 2rem;
      border-radius: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.9rem;
    }
    td {
      padding: 1rem;
      border-top: 1px solid var(--glass-border);
    }
    .font-bold { font-weight: 700; }
    .text-secondary { color: var(--text-secondary); }
    .actions {
      display: flex;
      justify-content: center;
    }
  `]
})
export class DetalleCotizacionComponent implements OnInit {
  cotizacion?: Cotizacion;
  tabla: DetalleCuota[] = [];

  constructor(
    private route: ActivatedRoute,
    private cotizacionService: CotizacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cotizacionService.cotizaciones$.subscribe(listado => {
      this.cotizacion = listado.find(c => c.id === id);
      if (this.cotizacion) {
        this.tabla = this.cotizacionService.generarTablaAmortizacion(
          this.cotizacion.monto,
          this.cotizacion.tasaInteresAnual,
          this.cotizacion.plazoMeses
        );
      }
    });
  }
}
