import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvestownerModel } from '@core/models/investowner.model';
import { OtherinvestmentdetailModel } from '@core/models/otherinvestmentdetail.model';
import { BonosModel } from '@core/models/bonos.model';
import { InvestmentService } from '../../services/investment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css']
})
export class InvestmentPageComponent implements OnInit{
  dataInvestownerlist: Array<InvestownerModel> = []
  dataOtherinvestmentdetaillist: Array<OtherinvestmentdetailModel> = []
  dataBonoslist: Array<BonosModel> = []

  constructor(private investmentService: InvestmentService){}

  listObservers$: Array<Subscription>=[]

  ngOnInit(): void{
    this.investmentService.getInvestOwner$()
          .subscribe((response: InvestownerModel[]) => {
                        this.dataInvestownerlist = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.investmentService.getOtherinvestmentdetail$()
    .subscribe((response: OtherinvestmentdetailModel[]) => {
                  this.dataOtherinvestmentdetaillist = response
                }, err => {console.log('Error de conexion');}
              )

    this.investmentService.getBonos$()
    .subscribe((response: BonosModel[]) => {
                  this.dataBonoslist = response
                }, err => {console.log('Error de conexion');}
               )


              //    console.log(this.dataInvestownerlist)

  }

  ngOnDestroy(): void{

  }



}
