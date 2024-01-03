import { Component,Input,OnInit } from '@angular/core';
import { BalanceModel } from '@core/models/balance.model';
import { TradingModel } from '@core/models/trading.model';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.css']
})
export class BalanceDetailComponent {
  @Input() title: string = ''
  @Input() dataBalancelist: Array<BalanceModel> = []
  @Input() dataTradingResultlist: Array<TradingModel> = []

  constructor() { }

  ngOnInit(): void {

  }


}
