export interface DividendosModel
{
  "id": number;
  "emisor_id": number;
  "emisor": string;
  "fecha_resolucion": Date;
  "fecha_ultimo_derecho": Date;
  "fecha_pago": string;
  "valor_nominal": number;
  "acciones_antes_dividendos": number;
  "ultimo_precio": number;
  "fecha_ultimo_precio": Date;
  "dividendo_efectivo": number;
  "dividendo_ef_por_accion": number;
  "precio_ajus_div_efectivo": number;
  "aum_dism_capital": number;
  "aumento_suscripcion": number;
  "capital_anterior": number;
  "acciones_antiguas": number;
  "capital_luego_evento": number;
  "acciones_totales": number;
  "aum_capital_capital_anterior": number;
  "factor_correccion": number;
  "precio_ajustado": number;
  "circular": string;
  "utilidad_neta_anio": number;
  "revision": string;
  "updated_at": Date;

}
