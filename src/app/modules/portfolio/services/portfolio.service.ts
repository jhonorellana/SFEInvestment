import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

    getInvestOwnernew$(): Observable<any>{
          return this.httpClient.get(`${this.URL}investownernew`);    // Tipo de inversion por propietario
    }

    getInvestOwner$(): Observable<any>{
      return this.httpClient.get(`${this.URL}investowner?total=NO`);
    }

    getTotalInvestOwner$(): Observable<any>{
      return this.httpClient.get(`${this.URL}totalinvestowner`);
    }

    getInvestEnterprise(): Observable<any>{
      return this.httpClient.get(`${this.URL}investenterprise`);
    }

    getInvestVSbond(): Observable<any>{
      return this.httpClient.get(`${this.URL}investvsbond`);
    }

    getCapitalByOwnerTypeInvest(tipo: string): Observable<any>{
      return this.httpClient.get(`${this.URL}capitalbytypeinvestOwner?type=${tipo}`);
    }

    getInvertidoRendimiento(tipo: string): Observable<any>{
      return this.httpClient.get(`${this.URL}invertidorendimiento?type=${tipo}`);
    }

    getInvertidoVencimiento(tipo: string): Observable<any>{
      return this.httpClient.get(`${this.URL}invertidovencimiento?type=${tipo}`);
    }

    getRecuperacionAnual(historico: string): Observable<any>{
      return this.httpClient.get(`${this.URL}recuperacionanual?historico=${historico}`);
    }



}
