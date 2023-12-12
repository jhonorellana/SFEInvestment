import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { InvestownernewModel } from '@core/models/investownernew.model';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  constructor(
    private portfolioService: PortfolioService,
   // private cdr: ChangeDetectorRef // Importa el ChangeDetectorRef
  ) {}

  dataInvestownernewlist: Array<InvestownernewModel> = [];
  dataPointChart: Array<InvestownernewModel> = [];
  yoyo: Array<any> = [];
  namename: Array<any> = [];

/*

  chartOptions = {
    animationEnabled: true,
    title: {
      text: "capital por propietario"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 14.1, name: "Toys" },
        { y: 28.2, name: "Electronics" },
        { y: 14.4, name: "Groceries" },
        { y: 43.3, name: "Furniture" }
      ],
    }
    ]
  };

*/


  chartOptions = {
    animationEnabled: true,
    title: {
      text: "capital por propietario"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: this.dataPointChart,
    }
    ]
  };





  ngOnInit(): void {
    this.portfolioService.getInvestOwner$()
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist = response;
          console.log(this.dataInvestownernewlist);


          // Actualiza directamente dataPoints en el objeto chartOptions
          this.chartOptions.data[0].dataPoints = this.dataInvestownernewlist.map(entry => ({
           name: entry.name,
           y: entry.y
          }));



          this.yoyo = this.dataInvestownernewlist.map(function(elem){
            return elem.y;
          })

          this.namename = this.dataInvestownernewlist.map(function(elem){
            return elem.name;
          })

          this.dataPointChart = this.dataInvestownernewlist.map(entry => ({
            y: entry.y,
            name: entry.name
          }));

          console.log(this.dataPointChart);
          console.log(this.yoyo);
          console.log(this.namename);
          // Detecta los cambios manualmente
         // this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );



  }
}
