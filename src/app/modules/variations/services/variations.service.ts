import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VariationsService {

  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

  ObtenerTodasVariaciones$(): Observable<any>{
    return this.httpClient.get(`${this.URL}variation`);
  }


}
