import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { InvestownernewModel } from '@core/models/investownernew.model';
import { InvestownerModel } from '@core/models/investowner.model';
import { InvestenterpriseModel } from '@core/models/investenterprise.model';
import { TypeinvestModel } from '@core/models/typeinvest.model';
import { Subscription } from 'rxjs';
import { InvertidoRendimientoModel } from '@core/models/invertidorendimiento';
import { InvertidoVencimientoModel } from '@core/models/invertidovencimiento';
import { RecuperacionAnualModel } from '@core/models/recuperacionanual.model';

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
  dataRecuperacionAnual: RecuperacionAnualModel[] = [];

  chartOptions1: any = {}; // Tipo de inversión por propietario
  chartOptions2: any = {}; // Capital consolidado por propietario
  chartOptions3: any = {}; // Capital invertido por Empresa
  chartOptions4: any = {}; // Bonos VS Inversiones.
  chartOptions5: any = {}; // Bonos por propietario.
  chartOptions6: any = {}; // Otras Inversiones por propietario.
  chartOptions7: any = {}; // Invertido Rendimiento Bonos.
  chartOptions8: any = {}; // Invertido Rendimiento Inversiones.
  chartOptions9: any = {}; // Invertido - tiempo en año Bonos.
  chartOptions10: any = {}; // Invertido - tiempo en año Inversiones.
  chartOptions11: any = {}; // Recuperación de capital historico
  chartOptions12: any = {}; // Recuperación de capital futuro.

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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Tipo de inversión por propietario"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Capital consolidado por propietario"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Capital invertido por Empresa"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Bonos - Inversiones - Acciones"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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



/*
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
              type: "column",
              startAngle: -90,
              indexLabel: "{y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestownernewlist.map(entry => ({
                label: entry.inversionpropietario,
                y: parseFloat(entry.capital)
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
              type: "column",
              indexLabel: "{y}",
              yValueFormatString: "'$'#,###.##",
              dataPoints: this.dataInvestownernewlist2.map(entry => ({
                label: entry.inversionpropietario,
                y: parseFloat(entry.capital)
              }))
            }]
          };
          this.cdr.detectChanges();
          console.log(this.chartOptions6);
        },
        err => {
          console.log('Error de conexión');
        }
      );

*/




      const observador5$ = this.portfolioService.getCapitalByOwnerTypeInvest('BONO')
      .subscribe(
        (response: InvestownernewModel[]) => {
          this.dataInvestownernewlist = response;
          this.chartOptions5 = {
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Bonos por propietario"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Otras Inversiones por propietario"
            },
            data: [{
              type: "doughnut",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Rendimiento en bonos"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
              //indexLabelFontColor: "blue",
              dataPoints: this.dataInvertidoRendimientoBonos.map(entry => ({
                name: entry.rendimiento + '% ',
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Rendimiento en otras inversiones"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
              dataPoints: this.dataInvertidoRendimientoInv.map(entry => ({
                name: entry.rendimiento + '% ',
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Vencimiento en bonos"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Vencimiento en otras inversiones"
            },
            data: [{
              type: "pie",
              startAngle: -90,
              indexLabel: "{name}: {y}",
              yValueFormatString: "'$'#,###.00",
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

      const observador11$ = this.portfolioService.getRecuperacionAnual('0')
      .subscribe(
        (response: RecuperacionAnualModel[]) => {
          this.dataRecuperacionAnual = response;
          //console.log(this.dataRecuperacionAnual); // Verificar los datos
          this.chartOptions11 = {
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Recuperación Anual"
            },
            axisX:{
                labelAngle: 0 //-90
            },
            axisY:{
              title: "Capital"
            },
            toolTip: {
              shared: true
            },
            legend:{
              cursor: "pointer",
              itemclick: function(e: any){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
                } else {
                  e.dataSeries.visible = true;
                }
                e.chart.render();
              }
            },
            data: [
              {
                type: "column",
                indexLabel: "{y}",
                name: "Total",
                legendText: "Total",
                //axisYType: "secondary",
                showInLegend: true,
                //yValueFormatString: "'$'#,###.00",
                yValueFormatString: "#,###",
                dataPoints: this.dataRecuperacionAnual.map(entry => ({
                  label: Number(entry.anio),
                  //y: Number(entry.total),
                  y: Math.round(Number(entry.total)), // Redondea a entero
                }))
              },
              {
              type: "column",
              indexLabel: "{y}",
              name: "Capital",
              legendText: "Capital",
              showInLegend: true,
              // Elimina temporalmente el indexLabel si causa problemas
              yValueFormatString: "#,###",
              dataPoints: this.dataRecuperacionAnual.map(entry => ({
                label: Number(entry.anio),
                //y: Number(entry.capital),
                y: Math.round(Number(entry.capital)), // Redondea a entero
              }))
            },
            {
              type: "column",
              indexLabel: "{y}",
              name: "Interés",
              legendText: "Interés",
              showInLegend: true,
              yValueFormatString: "#,###",
              dataPoints: this.dataRecuperacionAnual.map(entry => ({
                label: Number(entry.anio),
                y: Math.round(Number(entry.interes)), // Redondea a entero
              }))
            }
            ]
          };
          this.cdr.detectChanges();

        },
        err => {
          console.log('Error de conexión');
        }
      );





      const observador12$ = this.portfolioService.getRecuperacionAnual('1')
      .subscribe(
        (response: RecuperacionAnualModel[]) => {
          this.dataRecuperacionAnual = response;
          //console.log(this.dataRecuperacionAnual); // Verificar los datos
          this.chartOptions12 = {
            backgroundColor: "#EEFFEE",
            animationEnabled: true,
            title: {
              text: "Interés Anual"
            },
            axisX:{
                labelAngle: 0 //-90
            },
            axisY:{
              title: "Interés"
            },
            toolTip: {
              shared: true
            },
            legend:{
              cursor: "pointer",
              itemclick: function(e: any){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
                } else {
                  e.dataSeries.visible = true;
                }
                e.chart.render();
              }
            },
            data: [
/*              {
                type: "column",
                indexLabel: "{y}",
                name: "Total",
                legendText: "Total",
                //axisYType: "secondary",
                showInLegend: true,
                yValueFormatString: "'$'#,###.00",
                dataPoints: this.dataRecuperacionAnual.map(entry => ({
                  label: Number(entry.anio),
                  y: Number(entry.total),
                }))
              },
              {
              type: "column",
              //indexLabel: "{y}",
              name: "Capital",
              legendText: "Capital",
              showInLegend: true,
              // Elimina temporalmente el indexLabel si causa problemas
              yValueFormatString: "'$'#,###.00",
              dataPoints: this.dataRecuperacionAnual.map(entry => ({
                label: Number(entry.anio),
                y: Number(entry.capital),
              }))
            },
  */
            {
              type: "column",
              indexLabel: "{y}",
              name: "Interés",
              legendText: "Interés",
              //axisYType: "secondary",
              showInLegend: true,
              yValueFormatString: "'$'#,###.00",
              dataPoints: this.dataRecuperacionAnual.map(entry => ({
                label: Number(entry.anio),
                y: Number(entry.interes),
              }))
            }
            ]
          };
          this.cdr.detectChanges();

        },
        err => {
          console.log('Error de conexión');
        }
      );



    this.listaObservadores$ = [observador1$, observador2$, observador3$, observador4$, observador6$, observador7$, observador8$, observador9$, observador10$, observador11$ , observador12$   ];
  }

  ngAfterViewInit(): void {
    // No es necesario renderizar el gráfico nuevamente aquí,
    // ya que `ngOnInit` carga los datos y renderiza el gráfico.
  }

  ngOnDestroy(): void {
    this.listaObservadores$.forEach(u => u.unsubscribe());
  }
}
