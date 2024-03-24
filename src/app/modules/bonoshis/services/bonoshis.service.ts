import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class BonoshisService {

  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}


  ObtenerBonosHisResumen$(): Observable<any>{
    return this.httpClient.get(`${this.URL}bonoshisresumen`);
  }



}


