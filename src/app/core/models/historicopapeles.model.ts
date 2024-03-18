export interface HistoricopapelesModel
{
  "id": number;
  "fecha": Date,
  "emisor": string;
  "precio_porc": number;
  "rendimiento": number;
  "plazo_dias": number;
  "plazo_anios": number;
  "descuento_porc": number;
  "interes": number;
  "valornominal": number;
  "valorefectivo": number;
  "emision": Date;
  "vencimiento": Date;
  "procedencia": string;
  "mercado": string;
}
