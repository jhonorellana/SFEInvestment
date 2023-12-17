import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchcashflowService {
  private readonly URL = environment.api2;

  constructor(private http: HttpClient) { }


  SearchYearlyAmortization$(fechaInicio: string, fechaFin: string): Observable<any>{
    let anioFechaInicio: string = fechaInicio.substring(0, 4);
    return this.http.get(`${this.URL}amortization?year=${anioFechaInicio}`);

  }

  SearchAmortizationBetweenDates$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}amortizationdates?initialDate=${fechaInicio}&finalDate=${fechaFin}`);

  }

  SearchAmortizationBetweenDatesSummary$(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`${this.URL}amortizationdatessumary?initialDate=${fechaInicio}&finalDate=${fechaFin}`);

  }


}
