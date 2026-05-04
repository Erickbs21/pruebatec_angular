export interface Cotizacion {
  id?: string;
  monto: number;
  tasaInteresAnual: number;
  plazoMeses: number;
  fechaCreacion: Date;
  cuotaMensual?: number;
  totalPagar?: number;
}

export interface DetalleCuota {
  numeroCuota: number;
  montoCuota: number;
  interes: number;
  capital: number;
  saldoRestante: number;
}
