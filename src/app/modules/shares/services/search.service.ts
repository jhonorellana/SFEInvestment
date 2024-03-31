import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

  ObtenerTodasAccionesCompania$(emisor: string): Observable<any>{
    return this.httpClient.get(`${this.URL}shares?issuer=${emisor}`);
  }

  ObtenerAccionesCompaniaAnio$(emisor: string, anio: string): Observable<any>{
    return this.httpClient.get(`${this.URL}shares?issuer=${emisor}&year=${anio}`);
   }

   ObtenerDividendos$(emisor: string): Observable<any>{
    return this.httpClient.get(`${this.URL}dividendos?emisor=${emisor}`);
   }

   ObtenerSimulacion$(emisor: string, precio: string, capital: string): Observable<any>{
    return this.httpClient.get(`${this.URL}simulacion?emisor=${emisor}&precio=${precio}&capital=${capital}`);
//      return this.httpClient.get(`${this.URL}simulacion?emisor=${emisor}&precio=1.5&capital=1000`);
   }

}

