import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api2;

  constructor(private http: HttpClient) { }


  SearchYearlyAmortization$(cmbAnio: string): Observable<any>{
    return this.http.get(`${this.URL}amortization?year=${cmbAnio}`);

  }

  SearchMonthlyAmortization$(anio: string, mes: string): Observable<any>{
    return this.http.get(`${this.URL}monamortization?year=${anio}&month=${mes}`);

  }

  SearchMonAmortizationOwner$(anio: string, mes: string): Observable<any>{
    return this.http.get(`${this.URL}monamortizationowner?year=${anio}&month=${mes}`);

  }

/*
  getAllMontlyAmortization$(): Observable<any>{
    console.log('Entré a consultar nuevamente');
    return this.http.get(`${this.URL}`);
}

  getMonthlyDataForCurrentMonth$(currentYear: string ): Observable<any> {
  console.log('Dentro de la funcion esta -->',currentYear);
  return this.getAllMontlyAmortization$().pipe(
    map((data: any[]) => {
      console.log('Data from service:', data);
      return data.filter((item) => item.year === currentYear);
    })
  );
  }

*/


}
