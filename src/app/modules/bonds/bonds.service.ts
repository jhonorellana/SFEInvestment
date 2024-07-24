import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BondsService {
  private readonly URL = environment.api2;
  constructor(private httpClient: HttpClient) {}
  getBonos$(): Observable<any>{
    return this.httpClient.get(`${this.URL}bonos`);
  }
}
