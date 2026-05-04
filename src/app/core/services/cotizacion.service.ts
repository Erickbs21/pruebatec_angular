import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cotizacion, DetalleCuota } from '../models/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private cotizacionesSubject = new BehaviorSubject<Cotizacion[]>([]);
  public cotizaciones$ = this.cotizacionesSubject.asObservable();

  constructor() {
    // Cargar historial desde el almacenamiento local
    const guardadas = localStorage.getItem('cotizaciones');
    if (guardadas) {
      this.cotizacionesSubject.next(JSON.parse(guardadas));
    }
  }

  /**
   * Calcula la cuota mensual usando el sistema francés (amortización constante)
   */
  calcularCuotaMensual(monto: number, tasaAnual: number, meses: number): number {
    const tasaMensual = tasaAnual / 12 / 100;
    if (tasaMensual === 0) return monto / meses;
    
    const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
    return Number(cuota.toFixed(2));
  }

  /**
   * Genera la tabla completa de amortización
   */
  generarTablaAmortizacion(monto: number, tasaAnual: number, meses: number): DetalleCuota[] {
    const tasaMensual = tasaAnual / 12 / 100;
    const cuota = this.calcularCuotaMensual(monto, tasaAnual, meses);
    const tabla: DetalleCuota[] = [];
    let saldoRestante = monto;

    for (let i = 1; i <= meses; i++) {
      const interes = Number((saldoRestante * tasaMensual).toFixed(2));
      const capital = Number((cuota - interes).toFixed(2));
      saldoRestante = Number((saldoRestante - capital).toFixed(2));

      if (i === meses) {
        const ajuste = saldoRestante;
        tabla.push({
          numeroCuota: i,
          montoCuota: Number((cuota + ajuste).toFixed(2)),
          interes: interes,
          capital: Number((capital + ajuste).toFixed(2)),
          saldoRestante: 0
        });
      } else {
        tabla.push({
          numeroCuota: i,
          montoCuota: cuota,
          interes: interes,
          capital: capital,
          saldoRestante: Math.max(0, saldoRestante)
        });
      }
    }
    return tabla;
  }

  /**
   * Almacena una nueva cotización en el historial
   */
  guardarCotizacion(cotizacion: Cotizacion): void {
    const actual = this.cotizacionesSubject.value;
    const nueva: Cotizacion = {
      ...cotizacion,
      id: crypto.randomUUID(),
      fechaCreacion: new Date(),
      totalPagar: Number((cotizacion.cuotaMensual! * cotizacion.plazoMeses).toFixed(2))
    };
    
    const actualizadas = [nueva, ...actual];
    this.cotizacionesSubject.next(actualizadas);
    localStorage.setItem('cotizaciones', JSON.stringify(actualizadas));
  }
}
