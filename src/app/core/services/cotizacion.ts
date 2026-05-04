import { Injectable, signal, computed } from '@angular/core';
import { Cotizacion } from '../models/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private cotizacionesRaw = signal<Cotizacion[]>([]);
  
  // Lista de cotizaciones accesibles desde fuera
  public cotizaciones = computed(() => this.cotizacionesRaw());

  constructor() {
    // Cargar datos iniciales de ejemplo si se desea, o iniciar vacío
  }

  agregarCotizacion(cotizacion: Omit<Cotizacion, 'id' | 'fechaCreacion' | 'cuotaMensual'>) {
    const cuota = this.calcularCuota(
      cotizacion.montoSolicitado,
      cotizacion.tasaInteres,
      cotizacion.plazoMeses
    );

    const nueva: Cotizacion = {
      ...cotizacion,
      id: crypto.randomUUID(),
      fechaCreacion: new Date(),
      cuotaMensual: cuota
    };

    this.cotizacionesRaw.update(list => [...list, nueva]);
    return nueva;
  }

  obtenerPorId(id: string) {
    return this.cotizacionesRaw().find(c => c.id === id);
  }

  /**
   * Fórmula de amortización francesa:
   * M = P * [ i * (1 + i)^n] / [ (1 + i)^n - 1 ]
   */
  calcularCuota(principal: number, tasaAnual: number, meses: number): number {
    if (principal <= 0 || tasaAnual < 0 || meses <= 0) return 0;
    
    const i = (tasaAnual / 12) / 100;
    const n = meses;
    
    if (i === 0) return principal / n;

    const cuota = principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    return Number(cuota.toFixed(2));
  }
}
