import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyoverviewService {
  private readonly URL = environment.api2;

  constructor(private http: HttpClient) { }

  ConsultarUltimaFechaAcciones$(): Observable<any>{
    return this.http.get(`${this.URL}shareslastdate`);
  }

  ConsultarBonosDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicobonos?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  ConsultarAccionesDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicoacciones?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  ConsultarObligacionesDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicoobligaciones?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  ConsultarPapelesDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicopapeles?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  ConsultarFacturasDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicofacturas?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  ConsultarGenericosDelDia$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}historicogenericos?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }


}
