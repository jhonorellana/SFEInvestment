import { Component,Input,OnInit } from '@angular/core';
import { MonthlyamortizationModel } from '@core/models/monthlyamortization.model';
import { DailyamortizationModel  } from '@core/models/dailyamortization.model';
import { MonamortizationownerModel  } from '@core/models/monamortizationowner.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {
  @Input() title: string = ''
  @Input() dataMonhtlyamortization: Array<MonthlyamortizationModel> = []
  @Input() dataDailyamortization: Array<DailyamortizationModel> = []
  @Input() dataMonAmortizationOwner: Array<MonamortizationownerModel> = []

  constructor() { }

  ngOnInit(): void {

  }
}
