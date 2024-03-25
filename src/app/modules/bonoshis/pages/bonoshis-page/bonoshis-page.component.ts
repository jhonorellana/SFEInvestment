import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { BonoshisService } from '../../services/bonoshis.service';
import { BonoshisresumenModel } from '@core/models/bonoshisresumen.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bonoshis-page',
  templateUrl: './bonoshis-page.component.html',
  styleUrls: ['./bonoshis-page.component.css']
})
export class BonoshisPageComponent implements OnInit{

  listaObservadores$: Subscription[] = [];
  dataBonoshislist: BonoshisresumenModel[] = [];

  chartOptions_0: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_2: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_3: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_4: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_5: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_6: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_7: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_8: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_9: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions_10: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chart: any;


  constructor(
    private bonoshisService: BonoshisService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const observador1$ = this.bonoshisService.ObtenerBonosHisResumen$()
    .subscribe(
      (respuesta: BonoshisresumenModel[]) => {
       this.dataBonoshislist = respuesta;
       //console.log('dataVariationslist');
       //console.log(this.dataVariationslist);

       //////////////////////////////////////////////
       // MENOS DE UN AÑO
       //////////////////////////////////////////////
       this.chartOptions_0 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Menos de un año",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_0)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_0)
          }))

        }
      ]

       };


       //////////////////////////////////////////////
       // UN ANIO
       //////////////////////////////////////////////
       this.chartOptions_1 = {
        backgroundColor: "#E0FFE0",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Un año",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_1)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_1)
          }))

        }
      ]


    };




       //////////////////////////////////////////////
       // DOS AÑOS
       //////////////////////////////////////////////
       this.chartOptions_2 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Dos años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_2)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_2)
          }))

        }
      ]


    };






       //////////////////////////////////////////////
       // TRES AÑOS
       //////////////////////////////////////////////
       this.chartOptions_3 = {
        backgroundColor: "#E0FFE0",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Tres años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_3)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_3)
          }))

        }
      ]


    };







       //////////////////////////////////////////////
       // CUATRO AÑOS
       //////////////////////////////////////////////
       this.chartOptions_4 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Cuatro años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_4)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_4)
          }))

        }
      ]


    };






       //////////////////////////////////////////////
       // CINCO AÑOS
       //////////////////////////////////////////////
       this.chartOptions_5 = {
        backgroundColor: "#E0FFE0",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Cinco años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_5)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_5)
          }))

        }
      ]


    };








       //////////////////////////////////////////////
       // SEIS AÑOS
       //////////////////////////////////////////////
       this.chartOptions_6 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Seis años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_6)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_6)
          }))

        }
      ]


    };







       //////////////////////////////////////////////
       // SIETE AÑOS
       //////////////////////////////////////////////
       this.chartOptions_7 = {
        backgroundColor: "#E0FFE0",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Siete años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_7)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_7)
          }))

        }
      ]


    };








       //////////////////////////////////////////////
       // OCHO AÑOS
       //////////////////////////////////////////////
       this.chartOptions_8 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Ocho años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_8)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_8)
          }))

        }
      ]


    };








       //////////////////////////////////////////////
       // NUEVE AÑOS
       //////////////////////////////////////////////
       this.chartOptions_9 = {
        backgroundColor: "#E0FFE0",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Nueve años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_9)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_9)
          }))

        }
      ]


    };







       //////////////////////////////////////////////
       // DIEZ   AÑOS
       //////////////////////////////////////////////
       this.chartOptions_10 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Diez años",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Interés - Rendimiento",
        },
        axisX: {
          labelFontSize: 12,
          intervalType: "month",
          interval: 1,
          stripLines:[
            {
              value: new Date('2019-01-01')
            },
            {
              value: new Date('2020-01-01')
            },
            {
              value: new Date('2021-01-01')
            },
            {
              value: new Date('2022-01-01')
            },
            {
              value: new Date('2023-01-01')
            },
            {
              value: new Date('2024-01-01')
            }
            ],
        },
        legend: {
          fontSize: 20, // Tamaño de la fuente para las leyendas
        },
        data: [
          {
            type: "line",
            name: "Rendimiento",
            lineThickness: 1,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "###,###.##",
            dataPoints: this.dataBonoshislist.map(entry => ({
              x: new Date(entry.fecha),
              y: Number(entry.rendimiento_10)
            }))


          }
          ,
          {
          type: "line",
          name: "Interés",
          lineThickness: 1,
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "###,###.##",
          dataPoints: this.dataBonoshislist.map(entry => ({
            x: new Date(entry.fecha),
            y: Number(entry.tasa_10)
          }))

        }
      ]


    };






      this.cdr.detectChanges();
      },
      err => {
        console.log('Error de conexion');
      }
    );

}

ngOnDestroy(): void {
  this.listaObservadores$.forEach(u => u.unsubscribe());
}


}
