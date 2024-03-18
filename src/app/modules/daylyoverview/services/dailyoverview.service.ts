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

  ConsultarBonosDelDia$(): Observable<any>{
    return this.http.get(`${this.URL}historicobonos`);
  }

  ConsultarAccionesDelDia$(): Observable<any>{
    return this.http.get(`${this.URL}historicoacciones`);
  }

  ConsultarObligacionesDelDia$(): Observable<any>{
    return this.http.get(`${this.URL}historicoobligaciones`);
  }

  ConsultarPapelesDelDia$(): Observable<any>{
    return this.http.get(`${this.URL}historicopapeles`);
  }

}
