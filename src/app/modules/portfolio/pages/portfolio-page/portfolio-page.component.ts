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
    private cdr: ChangeDetectorRef // Importa el ChangeDetectorRef
  ) {}

  dataInvestownernewlist: Array<InvestownernewModel> = [];
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "capital por propietario"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "'$'#,###.##",
      dataPoints: this.dataInvestownernewlist,
    }]
  };

  ngOnInit(): void {
    this.cargaDatos();
  }

  ngAfterViewInit(): void {
    // No es necesario renderizar el gráfico nuevamente aquí,
    // ya que `ngOnInit` carga los datos y renderiza el gráfico.
  }

  private cargaDatos(): void {
    this.portfolioService.getInvestOwner$()
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist = response;
          // Actualiza directamente la referencia de dataPoints
          this.chartOptions.data[0].dataPoints = this.dataInvestownernewlist.map(entry => ({
            name: entry.name,
            y: entry.y
          }));
          console.log(this.chartOptions.data[0].dataPoints)
          console.log(this.dataInvestownernewlist)

          // Detecta los cambios manualmente
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );

      return
  }
}
