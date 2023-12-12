import { SearchService } from './../../services/search.service';
import { Component, OnInit, numberAttribute} from '@angular/core';
import { Subscription, Observable, of, map } from 'rxjs';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})

export class HistoryPageComponent implements OnInit{
  MonthlyamortizationList$: Observable<any> = of([])
  DailyamortizationList$: Observable<any> = of([])
  MonamortizationOwnerList$: Observable<any> = of([])

  MesActual: string ="";
  AnioActual: string ="";
  FechaActual = new Date();

  totalInteres: number=0;

  constructor(private searchService: SearchService){}

  listObservers$: Array<Subscription>=[]

  ngOnInit(): void{

    this.MesActual = (this.FechaActual.getMonth() + 1).toString();
    this.AnioActual = (this.FechaActual.getFullYear()).toString();

    this.MonthlyamortizationList$ = this.searchService.SearchYearlyAmortization$(this.AnioActual)
    this.DailyamortizationList$ = this.searchService.SearchMonthlyAmortization$(this.AnioActual,this.MesActual)
    this.MonamortizationOwnerList$ = this.searchService.SearchMonAmortizationOwner$(this.AnioActual,this.MesActual)

    //this.CalcularInteresTotal(this.MonthlyamortizationList$ )

  }

    recibeData(datoCambiado: string[]):void {
    console.log('Recibe data padre -->',datoCambiado)
    this.MonthlyamortizationList$ = this.searchService.SearchYearlyAmortization$(datoCambiado[0])
    this.DailyamortizationList$ = this.searchService.SearchMonthlyAmortization$(datoCambiado[0],datoCambiado[1])
    this.MonamortizationOwnerList$ = this.searchService.SearchMonAmortizationOwner$(datoCambiado[0],datoCambiado[1])
  }

/*
  CalcularInteresTotal(miObservable: Observable<any>){
    miObservable.pipe(
      map((data) => {
        // Calcular el total del interés
        this.totalInteres = data.reduce((total, item) => total + item.interes, 0);
        return data;
      }));

  }
*/

}


