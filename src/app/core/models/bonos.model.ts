export interface BonosModel
{
  propietario: string;
  fechaCompra: string;
  fechaPrimerPago: Date;
  fechaEmision: Date;
  fechaVencimiento: Date;
  tasaMensual: number;
  tasaMensualReal: number;
  rendimiento: number;
  interesMensual: number;
  interesPrimerMes: number;
  valorNominal: number;
  precioComprado: number;
  precioNetoComprado: number;
  valorSinComision: number;
  valorConComision: number;
  pagado: number;
  interesAcumulado: number;
  comisionCasa: number;
  comisionBolsa: number;
  totalComisiones: number;
}
