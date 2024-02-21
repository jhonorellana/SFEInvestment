import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { VariationsService } from '../../services/variations.service';
import { VariationsModel } from '@core/models/variations.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-variations-page',
  templateUrl: './variations-page.component.html',
  styleUrls: ['./variations-page.component.css']
})
export class VariationsPageComponent implements OnInit {

  listaObservadores$: Subscription[] = [];
  dataVariationslist: VariationsModel[] = [];

  chartOptions1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chart: any;
  constructor(
    private variationsService: VariationsService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    const observador1$ = this.variationsService.ObtenerTodasVariaciones$()
    .subscribe(
      (respuesta: VariationsModel[]) => {
       this.dataVariationslist = respuesta;
       //console.log('dataVariationslist');
       //console.log(this.dataVariationslist);
       this.chartOptions1 = {
        backgroundColor: "#EEFFEE",
        theme: "light1",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Capital invertido",
          fontSize: 25,
        },
        axisY: {
          labelFontSize: 12,
          title: "Capital",
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
            name: "Capital Total",
            lineThickness: 3,
            showInLegend: true,
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$###,###.##",
            dataPoints: this.dataVariationslist.map(entry => ({
              x: new Date(entry.Fecha),
              y: Number(entry.SaldoTotal)
            }))

          }
          ,
          {
          type: "line",
          name: "Jhon",
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "$###,###.##",
          dataPoints: this.dataVariationslist.map(entry => ({
            x: new Date(entry.Fecha),
            y: Number(entry.TotalPropio)
          }))

        }
         ,
        {
          type: "line",
          name: "Jaime",
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "$###,###.##",
          dataPoints: this.dataVariationslist.map(entry => ({
            x: new Date(entry.Fecha),
            y: Number(entry.Jaime)
          }))

        }
        ,
        {
          type: "line",
          name: "Cristian",
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "$###,###.##",
          dataPoints: this.dataVariationslist.map(entry => ({
            x: new Date(entry.Fecha),
            y: Number(entry.Cristian)
          }))

        }
        ,
        {
          type: "line",
          name: "Argentina",
          showInLegend: true,
          xValueFormatString: "YYYY/MM/DD",
          yValueFormatString: "$###,###.##",
          dataPoints: this.dataVariationslist.map(entry => ({
            x: new Date(entry.Fecha),
            y: Number(entry.Argentina)
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
