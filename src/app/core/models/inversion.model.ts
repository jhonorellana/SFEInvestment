export interface InversionModel
{
  id: number;
  Tipo: number;
  FechaCompra: Date;
  FechaVencimiento: Date;
  Propietario: string;
  Empresa: string;
  TasaInteres: number;
  Rendimiento: number;
  Capital: number;
  Retencion: number;
  Pagado: number;
  Expirado: number;
  Activo: number;
}
