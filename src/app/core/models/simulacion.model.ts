export interface SimulacionModel
{
  id: number;
  resolucion: Date;
  precio: number;
  valorNominal: number;
  cantidadAcciones: number;
  dividendoEfectivo: number;
  dividendoAcciones: number;
  efectivoRecibido: number;
  accionesRecibidas: number;
  accionesEnEfectivo: number;
  efectivoTotal: number;
}
