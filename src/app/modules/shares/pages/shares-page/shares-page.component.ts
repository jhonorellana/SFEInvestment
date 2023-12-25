import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharesModel } from '@core/models/shares.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shares-page',
  templateUrl: './shares-page.component.html',
  styleUrls: ['./shares-page.component.css']
})
export class SharesPageComponent implements OnInit {
  formAcciones: FormGroup = new FormGroup({});

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

      this.formAcciones = new FormGroup(
        {
          cmbEmisor: new FormControl('16'),
          cmbPrueba: new FormControl('Prueba')
        }
      )

      this.ConstruirGraficoTotal();
      this.ConstruirGraficoEmisorAnio2017('2017');
      this.ConstruirGraficoEmisorAnio2018('2018');
      this.ConstruirGraficoEmisorAnio2019('2019');
      this.ConstruirGraficoEmisorAnio2020('2020');
      this.ConstruirGraficoEmisorAnio2021('2021');
      this.ConstruirGraficoEmisorAnio2022('2022');
      this.ConstruirGraficoEmisorAnio2023('2023');


     // this.listaObservadores$ = [ observador2020$, observador2021$, observador2022$, observador2023$];
    }


    ConstruirGraficoTotal():void{
            const {cmbEmisor, cmbPrueba} = this.formAcciones.value
            const observador1$ = this.searchService.ObtenerTodasAccionesCompania$(cmbEmisor)
            .subscribe(
              (respuesta: SharesModel[]) => {
               this.dataShareslist = respuesta;
               //console.log(this.dataShareslist);

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
                  xValueFormatString: "YYYY/MM",
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

    }


    ConstruirGraficoEmisorAnio2017(anio: string): void{
      const {cmbEmisor, cmbPrueba} = this.formAcciones.value
      const observador2017$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
      .subscribe(
        (respuesta: SharesModel[]) => {
         this.dataShareslist = respuesta;
         this.chartOptions2017 = {
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: `Precios año ${anio}`
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

    }

    ConstruirGraficoEmisorAnio2018(anio: string): void{
    const {cmbEmisor, cmbPrueba} = this.formAcciones.value
    const observador2018$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
    .subscribe(
      (respuesta: SharesModel[]) => {
       this.dataShareslist = respuesta;

       this.chartOptions2018 = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
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
    }


    ConstruirGraficoEmisorAnio2019(anio: string): void{
      const {cmbEmisor, cmbPrueba} = this.formAcciones.value
      const observador2019$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
    .subscribe(
      (respuesta: SharesModel[]) => {
       this.dataShareslist = respuesta;

       this.chartOptions2019 = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
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
    }


    ConstruirGraficoEmisorAnio2020(anio: string): void{
      const {cmbEmisor, cmbPrueba} = this.formAcciones.value
      const observador2020$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
      .subscribe(
      (respuesta: SharesModel[]) => {
       this.dataShareslist = respuesta;

       this.chartOptions2020 = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
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
    }


    ConstruirGraficoEmisorAnio2021(anio: string): void{
      const {cmbEmisor, cmbPrueba} = this.formAcciones.value
      const observador2021$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
    .subscribe(
      (respuesta: SharesModel[]) => {
       this.dataShareslist = respuesta;

       this.chartOptions2021 = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
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


  }



  ConstruirGraficoEmisorAnio2022(anio: string): void{
    const {cmbEmisor, cmbPrueba} = this.formAcciones.value
    const observador2022$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
  .subscribe(
    (respuesta: SharesModel[]) => {
     this.dataShareslist = respuesta;

     this.chartOptions2022 = {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: `Precios año ${anio}`
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
  }



  ConstruirGraficoEmisorAnio2023(anio: string): void{
    const {cmbEmisor, cmbPrueba} = this.formAcciones.value
    const observador2023$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
  .subscribe(
    (respuesta: SharesModel[]) => {
     this.dataShareslist = respuesta;

     this.chartOptions2023 = {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: `Precios año ${anio}`
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

  }

    ngOnDestroy(): void {
      this.listaObservadores$.forEach(u => u.unsubscribe());
    }


    enviarConsulta(): void {
      this.ConstruirGraficoTotal();
      this.ConstruirGraficoEmisorAnio2017('2017');
      this.ConstruirGraficoEmisorAnio2018('2018');
      this.ConstruirGraficoEmisorAnio2019('2019');
      this.ConstruirGraficoEmisorAnio2020('2020');
      this.ConstruirGraficoEmisorAnio2021('2021');
      this.ConstruirGraficoEmisorAnio2022('2022');
      this.ConstruirGraficoEmisorAnio2023('2023');

    }




}
