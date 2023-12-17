import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of, map } from 'rxjs';
import { SearchcashflowService } from './../../services/searchcashflow.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cashflow-page',
  templateUrl: './cashflow-page.component.html',
  styleUrls: ['./cashflow-page.component.css']
})
export class CashflowPageComponent implements OnInit{
  MonthlyamortizationList$: Observable<any> = of([])
  DailyamortizationList$: Observable<any> = of([])
  MonamortizationOwnerList$: Observable<any> = of([])

  formBusqueda: FormGroup = new FormGroup({})

  MesActual: string ="";
  AnioActual: string ="";
  FechaActual = new Date();

  _fechaInicio: string="";
  _fechaFin: string="";

  totalInteres: number=0;

  constructor(private searchcashflowService: SearchcashflowService){}

  listObservers$: Array<Subscription>=[]

  ngOnInit(): void {

    this.MesActual = (this.FechaActual.getMonth() + 1).toString();
    this.AnioActual = (this.FechaActual.getFullYear()).toString();

    this._fechaInicio = `${this.AnioActual}-${this.MesActual}-01`;
    this._fechaFin=`${this.AnioActual}-${this.MesActual}-30`;

    this.formBusqueda = new FormGroup({
      fechaInicio: new FormControl(`${this._fechaInicio}`,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),

      fechaFin: new FormControl(`${this._fechaFin}`,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
     }
    )





    this.MonthlyamortizationList$ = this.searchcashflowService.SearchYearlyAmortization$(this._fechaInicio,this._fechaFin)
    this.DailyamortizationList$ = this.searchcashflowService.SearchMonthlyAmortization$(this._fechaInicio,this._fechaFin)
    this.MonamortizationOwnerList$ = this.searchcashflowService.SearchMonAmortizationOwner$(this._fechaInicio,this._fechaFin)
  }

  enviarConsulta():void{

    const { fechaInicio, fechaFin} = this.formBusqueda.value

    this.MonthlyamortizationList$ = this.searchcashflowService.SearchYearlyAmortization$(fechaInicio, fechaFin)
    this.DailyamortizationList$ = this.searchcashflowService.SearchMonthlyAmortization$(fechaInicio, fechaFin)
    this.MonamortizationOwnerList$ = this.searchcashflowService.SearchMonAmortizationOwner$(fechaInicio, fechaFin)


  }
}
