import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of, map } from 'rxjs';
import { BalanceService } from './../../services/balance.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html',
  styleUrls: ['./balance-page.component.css']
})
export class BalancePageComponent implements OnInit{
  BalanceList$: Observable<any> = of([])
  TradingResultList$: Observable<any> = of([])

  formBalance: FormGroup = new FormGroup({})

  MesActual: string ="";
  AnioActual: string ="";
  FechaActual = new Date();

  _fechaInicio: string="";
  _fechaFin: string="";

  constructor(private balanceService: BalanceService){}

  listObservers$: Array<Subscription>=[]

  ngOnInit(): void {

    this.MesActual = (this.FechaActual.getMonth() + 1).toString();
    this.AnioActual = (this.FechaActual.getFullYear()).toString();

    this._fechaInicio = `${this.AnioActual}-${this.MesActual}-01`;
    this._fechaFin=`${this.AnioActual}-${this.MesActual}-30`;

    this.formBalance = new FormGroup({
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

    this.BalanceList$ = this.balanceService.BalanceCompute$(this._fechaInicio,this._fechaFin)
    this.TradingResultList$ = this.balanceService.TradingResultCompute$(this._fechaInicio,this._fechaFin)

  }

  enviarConsulta():void{

    const { fechaInicio, fechaFin} = this.formBalance.value

    this.BalanceList$ = this.balanceService.BalanceCompute$(fechaInicio, fechaFin)

    this.TradingResultList$ = this.balanceService.TradingResultCompute$(fechaInicio, fechaFin)
    console.log(this.TradingResultList$)


  }

}
