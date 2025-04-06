import { MonthlyamortizationModel } from '@core/models/monthlyamortization.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-month',
  templateUrl: './card-month.component.html',
  styleUrls: ['./card-month.component.css']
})
export class CardMonthComponent implements OnInit{
  @Input() mode: 'small' | 'big' = 'small'
  @Input() amortization: MonthlyamortizationModel = { anio: '2000', mes: '', capital: '', interes: '', capital_moroso: '', interes_moroso: '', total: '' };

  ngOnInit(): void {
  }
}


