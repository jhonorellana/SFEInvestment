import { Component,Input,OnInit } from '@angular/core';
import { InvestownerModel } from '@core/models/investowner.model';
import { OtherinvestmentdetailModel } from '@core/models/otherinvestmentdetail.model';
import { BonosModel } from '@core/models/bonos.model';


@Component({
  selector: 'app-section-summary',
  templateUrl: './section-summary.component.html',
  styleUrls: ['./section-summary.component.css']
})

export class SectionSummaryComponent implements OnInit {
  @Input() title: string = ''
  @Input() dataOwnerlist: Array<InvestownerModel> = []
  @Input() dataOtherinvestmentdetaillist: Array<OtherinvestmentdetailModel> = []
  @Input() dataBonoslist: Array<BonosModel> = []

  constructor() { }

  ngOnInit(): void {

  }

}
