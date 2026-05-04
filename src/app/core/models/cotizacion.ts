export interface Cotizacion {
  id: string;
  nombreCliente: string;
  montoSolicitado: number;
  tasaInteres: number;
  plazoMeses: number;
  cuotaMensual: number;
  fechaCreacion: Date;
}
