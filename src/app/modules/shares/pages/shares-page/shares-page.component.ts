import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharesModel } from '@core/models/shares.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shares-page',
  templateUrl: './shares-page.component.html',
  styleUrls: ['./shares-page.component.css']
})
export class SharesPageComponent implements OnInit {

  listaObservadores$: Subscription[] = [];
  dataShareslist: SharesModel[] = [];

  chartOptions1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2017: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2018: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2019: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2020: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2021: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2022: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2023: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
      chart: any;

  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

      ngOnInit(): void {

      /////////////////////////////////////////////////////////////////////////////
      const observador1$ = this.searchService.ObtenerTodasAccionesCompania$('16')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions1 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Acciones por día desde 2017 hasta 2023"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );


      /////////////////////////////////////////////////////////////////////////////
      const observador2017$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2017')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;
         this.chartOptions2017 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2017"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );


      /////////////////////////////////////////////////////////////////////////////
      const observador2018$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2018')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2018 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2018"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );



      /////////////////////////////////////////////////////////////////////////////
      const observador2019$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2019')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2019 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2019"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );




      /////////////////////////////////////////////////////////////////////////////
      const observador2020$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2020')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2020 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2020"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );



      /////////////////////////////////////////////////////////////////////////////
      const observador2021$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2021')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2021 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2021"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );



      /////////////////////////////////////////////////////////////////////////////
      const observador2022$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2022')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2022 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2022"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );




      /////////////////////////////////////////////////////////////////////////////
      const observador2023$ = this.searchService.ObtenerAccionesCompaniaAnio$('16','2023')
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;

         this.chartOptions2023 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Precios año 2023"
          },
          axisY: {
          },
          data: [{
            type: "line",
            xValueFormatString: "YYYY/MM/DD",
            yValueFormatString: "$#,###.##",
            dataPoints: this.dataShareslist.map(entry => ({
              x: new Date(entry.fecha),
              y: entry.precio
            }))


          }]

        };

        this.cdr.detectChanges();
        },
        err => {
          console.log('Error de conexion');
        }
      );





























      this.listaObservadores$ = [observador1$, observador2017$, observador2018$, observador2019$, observador2020$, observador2021$, observador2022$, observador2023$];
    }

    ngOnDestroy(): void {
      this.listaObservadores$.forEach(u => u.unsubscribe());
    }
}
