import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { InvestownernewModel } from '@core/models/investownernew.model';
import { InvestownerModel } from '@core/models/investowner.model';
import { InvestenterpriseModel } from '@core/models/investenterprise.model';
import { TypeinvestModel } from '@core/models/typeinvest.model';
import { Subscription } from 'rxjs';
import { InvertidoRendimientoModel } from '@core/models/invertidorendimiento';
import { InvertidoVencimientoModel } from '@core/models/invertidovencimiento';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit, AfterViewInit, OnDestroy {

  listaObservadores$: Subscription[] = [];
  dataInvestownernewlist: InvestownernewModel[] = [];
  dataInvestownernewlist2: InvestownernewModel[] = [];
  dataInvestownerlist: InvestownerModel[] = [];
  dataInvestenterpriselist: InvestenterpriseModel[] = [];
  dataTypeinvestlist: TypeinvestModel[] = [];
  dataInvertidoRendimientoBonos: InvertidoRendimientoModel[] = [];
  dataInvertidoRendimientoInv: InvertidoRendimientoModel[] = [];
  dataInvertidoVencimientoBonos: InvertidoVencimientoModel[] = [];
  dataInvertidoVencimientoInv: InvertidoVencimientoModel[] = [];

  chartOptions1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions3: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions4: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions5: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions6: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions7: any = {}; // Invertido Rendimiento Bonos.
  chartOptions8: any = {}; // Invertido Rendimiento Inversiones.
  chartOptions9: any = {}; // Invertido - tiempo en año Bonos.
  chartOptions10: any = {}; // Invertido - tiempo en año Inversiones.


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




      const observador5$ = this.portfolioService.getCapitalByOwnerTypeInvest('BONO')
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist = response;
          this.chartOptions5 = {
            animationEnabled: true,
            title: {
              text: "Bonos por propietario"
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


      const observador6$ = this.portfolioService.getCapitalByOwnerTypeInvest('INVERSIONES')
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist2 = response;
          this.chartOptions6 = {
            animationEnabled: true,
            title: {
              text: "Otras Inversiones por propietario"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestownernewlist2.map(entry => ({
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


      const observador7$ = this.portfolioService.getInvertidoRendimiento('BONO')
      .subscribe(
        (response: InvertidoRendimientoModel[]) => {
          this.dataInvertidoRendimientoBonos = response;
          this.chartOptions7 = {
            animationEnabled: true,
            title: {
              text: "Rendimiento en bonos"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvertidoRendimientoBonos.map(entry => ({
                name: entry.rendimiento,
                y: entry.invertido
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );



      const observador8$ = this.portfolioService.getInvertidoRendimiento('INVERSIONES')
      .subscribe(
        (response: InvertidoRendimientoModel[]) => {
          this.dataInvertidoRendimientoInv = response;
          this.chartOptions8 = {
            animationEnabled: true,
            title: {
              text: "Rendimiento en otras inversiones"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvertidoRendimientoInv.map(entry => ({
                name: entry.rendimiento,
                y: entry.invertido
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );


      const observador9$ = this.portfolioService.getInvertidoVencimiento('BONO')
      .subscribe(
        (response: InvertidoVencimientoModel[]) => {
          this.dataInvertidoVencimientoBonos = response;
          this.chartOptions9 = {
            animationEnabled: true,
            title: {
              text: "Vencimiento en bonos"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvertidoVencimientoBonos.map(entry => ({
                name: entry.anioVencimiento,
                y: entry.invertido
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );


      const observador10$ = this.portfolioService.getInvertidoVencimiento('INVERSIONES')
      .subscribe(
        (response: InvertidoVencimientoModel[]) => {
          this.dataInvertidoVencimientoInv = response;
          this.chartOptions10 = {
            animationEnabled: true,
            title: {
              text: "Vencimiento en otras inversiones"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvertidoVencimientoInv.map(entry => ({
                name: entry.anioVencimiento,
                y: entry.invertido
              }))
            }]
          };
          this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexión');
        }
      );



    this.listaObservadores$ = [observador1$, observador2$, observador3$, observador4$, observador6$, observador7$, observador8$, observador9$, observador10$  ];
  }

  ngAfterViewInit(): void {
    // No es necesario renderizar el gráfico nuevamente aquí,
    // ya que `ngOnInit` carga los datos y renderiza el gráfico.
  }

  ngOnDestroy(): void {
    this.listaObservadores$.forEach(u => u.unsubscribe());
  }
}
