import { Component,Input,OnInit } from '@angular/core';
import { InvestownerModel } from '@core/models/investowner.model';
import { BalanceModel } from '@core/models/balance.model';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.css']
})
export class BalanceDetailComponent {
  @Input() title: string = ''
  @Input() dataBalancelist: Array<BalanceModel> = []

  constructor() { }

  ngOnInit(): void {

  }


}
