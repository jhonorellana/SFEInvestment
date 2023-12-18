import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { InvestownernewModel } from '@core/models/investownernew.model';
import { InvestownerModel } from '@core/models/investowner.model';
import { InvestenterpriseModel } from '@core/models/investenterprise.model';
import { TypeinvestModel } from '@core/models/typeinvest.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit, AfterViewInit, OnDestroy {

  listaObservadores$: Subscription[] = [];
  dataInvestownernewlist: InvestownernewModel[] = [];
  dataInvestownerlist: InvestownerModel[] = [];
  dataInvestenterpriselist: InvestenterpriseModel[] = [];
  dataTypeinvestlist: TypeinvestModel[] = [];

  chartOptions1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions3: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions4: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const observador1$ = this.portfolioService.getInvestOwnernew$()
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist = response;
          this.chartOptions1 = {
            animationEnabled: true,
            title: {
              text: "Tipo de inversión por propietario"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestownernewlist.map(entry => ({
                name: entry.inversionpropietario,
                y: entry.capital
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );


      const observador2$ = this.portfolioService.getTotalInvestOwner$()
      .subscribe(
        (response: InvestownerModel[]) => {
          this.dataInvestownerlist = response;
          this.chartOptions2 = {
            animationEnabled: true,
            title: {
              text: "Capital consolidado por propietario"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestownerlist.map(entry => ({
                name: entry.propietario,
                y: entry.capital
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );



      const observador3$ = this.portfolioService.getInvestEnterprise()
      .subscribe(
        (response: InvestenterpriseModel[]) => {
          this.dataInvestenterpriselist = response;
          this.chartOptions3 = {
            animationEnabled: true,
            title: {
              text: "Capital invertido por Empresa"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestenterpriselist.map(entry => ({
                name: entry.empresa,
                y: entry.capital
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );



      const observador4$ = this.portfolioService.getInvestVSbond()
      .subscribe(
        (response: TypeinvestModel[]) => {
          this.dataTypeinvestlist = response;
          this.chartOptions4 = {
            animationEnabled: true,
            title: {
              text: "Bonos VS Inversiones"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataTypeinvestlist.map(entry => ({
                name: entry.tipo,
                y: entry.capital
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );










    this.listaObservadores$ = [observador1$, observador2$, observador3$];
  }

  ngAfterViewInit(): void {
    // No es necesario renderizar el gráfico nuevamente aquí,
    // ya que `ngOnInit` carga los datos y renderiza el gráfico.
  }

  ngOnDestroy(): void {
    this.listaObservadores$.forEach(u => u.unsubscribe());
  }
}
