import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}
//    constructor(private httpClient: HttpClient) {}

    getInvestOwner$(): Observable<any>{
          return this.httpClient.get(`${this.URL}investowner`);
    }


    getOtherinvestmentdetail$(): Observable<any>{
      return this.httpClient.get(`${this.URL}otherinvestmentdetail`);
    }

    getBonos$(): Observable<any>{
      return this.httpClient.get(`${this.URL}bonos`);
    }



}
















