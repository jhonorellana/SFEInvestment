import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private readonly URL = environment.api2;

  constructor(private http: HttpClient) { }

  BalanceCompute$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}balance?initialDate=${fechaInicio}&finalDate=${fechaFin}`);
  }

  TradingResultCompute$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}trading?initialDate=${fechaInicio}&finalDate=${fechaFin}`);

  }

}
