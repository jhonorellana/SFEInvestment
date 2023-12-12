import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvestownerModel } from '@core/models/investowner.model';
import { InvestenterpriseModel } from '@core/models/investenterprise.model';
import { InvestmentService } from '../../services/investment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css']
})
export class InvestmentPageComponent implements OnInit{
  dataInvestownerlist: Array<InvestownerModel> = []
  dataInvestenterpriselist: Array<InvestenterpriseModel> = []

  constructor(private investmentService: InvestmentService){}

  listObservers$: Array<Subscription>=[]

  ngOnInit(): void{
    this.investmentService.getInvestOwner$()
          .subscribe((response: InvestownerModel[]) => {
                        this.dataInvestownerlist = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.investmentService.getInvestByEnterprise$()
    .subscribe((response: InvestenterpriseModel[]) => {
                  this.dataInvestenterpriselist = response
                }, err => {console.log('Error de conexion');}
              )

//    console.log(this.dataInvestownerlist)

  }

  ngOnDestroy(): void{

  }



}
