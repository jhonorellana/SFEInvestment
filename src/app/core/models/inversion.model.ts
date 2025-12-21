export interface InversionModel {
  // Identificación
  id?: number;
  inv_tipo: number | null;
  inv_propietario: string;
  inv_liquidacion: string | null;

  // Fechas
  inv_fecha_compra: Date | string;
  inv_fecha_emision: Date | string | null;
  inv_fecha_vencimiento: Date | string | null;
  inv_fecha_venta: Date | string | null;

  // Información de la inversión
  inv_emisor: string;
  inv_calificacion_riesgo: string | null;
  inv_valor_nominal: number | null;
  inv_monto_a_negociar: number | null;
  inv_capital_invertido: number;
  inv_precio: number | null;

  // Tasas y rendimientos
  inv_tasa_interes: number;
  inv_rendimiento_nominal: number;
  inv_rendimiento_efectivo: number | null;
  inv_valor_efectivo: number | null;
  inv_valor_interes: number | null;

  // Comisiones e impuestos
  inv_comision_bolsa: number | null;
  inv_comision_operador: number | null;
  inv_retencion: number | null;

  // Estados
  inv_expirado: boolean;
  inv_pagada: boolean;
  is_active: boolean;
  is_deleted: boolean;

  // Auditoría
  created_at?: string;
  updated_at?: string;
}
