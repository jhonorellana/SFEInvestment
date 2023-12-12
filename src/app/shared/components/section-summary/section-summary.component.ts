import { Component,Input,OnInit } from '@angular/core';
import { InvestownerModel } from '@core/models/investowner.model';
import { InvestenterpriseModel } from '@core/models/investenterprise.model';


@Component({
  selector: 'app-section-summary',
  templateUrl: './section-summary.component.html',
  styleUrls: ['./section-summary.component.css']
})

export class SectionSummaryComponent implements OnInit {
  @Input() title: string = ''
  @Input() dataOwnerlist: Array<InvestownerModel> = []
  @Input() dataEnterpriselist: Array<InvestenterpriseModel> = []

  constructor() { }

  ngOnInit(): void {

  }

}
