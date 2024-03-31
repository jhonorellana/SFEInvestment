import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharesModel } from '@core/models/shares.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { DividendosModel } from '@core/models/dividendos.model';

@Component({
  selector: 'app-shares-page',
  templateUrl: './shares-page.component.html',
  styleUrls: ['./shares-page.component.css']
})
export class SharesPageComponent implements OnInit {
  formAcciones: FormGroup = new FormGroup({});

  listaObservadores$: Subscription[] = [];
  dataShareslist: SharesModel[] = [];
  dataDividendos: DividendosModel[] = [];

  chartOptions1: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2017: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2018: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2019: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2020: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2021: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2022: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2023: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
  chartOptions2024: any = {}; // Puedes ajustar el tipo según la estructura de tu objeto.
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
      this.ConstruirGraficoEmisorAnio2024('2024');
      this.PresentarInformacionDividendos();



     // this.listaObservadores$ = [ observador2020$, observador2021$, observador2022$, observador2023$];
    }

     PresentarInformacionDividendos():void{
      const {cmbEmisor, cmbPrueba} = this.formAcciones.value

      const observador11$ = this.searchService.ObtenerDividendos$(cmbEmisor)
      .subscribe((response: DividendosModel[]) => {
        this.dataDividendos = response
      }, err => {console.log('Error de conexion');}
    )

    }

    ConstruirGraficoTotal():void{
            const {cmbEmisor, cmbPrueba} = this.formAcciones.value
            const observador1$ = this.searchService.ObtenerTodasAccionesCompania$(cmbEmisor)
            .subscribe(
              (respuesta: SharesModel[]) => {
               this.dataShareslist = respuesta;
               //console.log(this.dataShareslist);

               this.chartOptions1 = {
                backgroundColor: "#E0FFE0",
                theme: "light2",
                animationEnabled: true,
                zoomEnabled: true,
                title: {
                  text: "Acciones por día desde 2017 hasta 2024"
                },
                axisX: {
                  labelFontSize: 12,
                  intervalType: "year",
                  interval: 1,
                  minimum: new Date('2017-01-01'),
                  maximum: new Date('2025-01-01'),
                  stripLines:[
                    {
                      value: new Date('2017-01-01')
                    },
                    {
                      value: new Date('2018-01-01')
                    },
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
                    },
                    {
                      value: new Date('2024-12-31')
                    }
                    ],
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
          if (respuesta && respuesta.length >= 2) {
            this.dataShareslist = respuesta;
                        this.dataShareslist = respuesta;
                        this.chartOptions2017 = {
                          backgroundColor: "#EEFFEE",
                          theme: "light2",
                          animationEnabled: true,
                          zoomEnabled: true,
                          title: {
                            text: `Precios año ${anio}`
                          },
                          axisX: {
                            labelFontSize: 12,
                            intervalType: "month",
                            interval: 1,
                            minimum: new Date('2017-01-01'),
                            maximum: new Date('2018-01-01'),
                              stripLines:[
                              {
                                value: new Date('2017-01-01')
                              },
                              {
                                value: new Date('2017-02-01')
                              },
                              {
                                value: new Date('2017-03-01')
                              },
                              {
                                value: new Date('2017-04-01')
                              },
                              {
                                value: new Date('2017-05-01')
                              },
                              {
                                value: new Date('2017-06-01')
                              },
                              {
                                value: new Date('2017-07-01')
                              },
                              {
                                value: new Date('2017-08-01')
                              },
                              {
                                value: new Date('2017-09-01')
                              },
                              {
                                value: new Date('2017-10-01')
                              },
                              {
                                value: new Date('2017-11-01')
                              },
                              {
                                value: new Date('2017-12-01')
                              },
                              {
                                value: new Date('2017-12-31')
                              }
                              ],
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
                        }
        }
        else{
          this.chartOptions2017 = {
            backgroundColor: "#EEFFEE",
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true,
            title: {
              text: `Precios año ${anio}`
            },
            data: []
          };
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
        if (respuesta && respuesta.length >= 2) {
          this.dataShareslist = respuesta;


                          this.chartOptions2018 = {
                            backgroundColor: "#E0FFE0",
                            theme: "light2",
                            animationEnabled: true,
                            zoomEnabled: true,
                            title: {
                              text: `Precios año ${anio}`
                            },
                            axisX: {
                              labelFontSize: 12,
                              intervalType: "month",
                              interval: 1,
                              minimum: new Date('2018-01-01'),
                              maximum: new Date('2019-01-01'),
                              stripLines:[
                                {
                                  value: new Date('2018-01-01')
                                },
                                {
                                  value: new Date('2018-02-01')
                                },
                                {
                                  value: new Date('2018-03-01')
                                },
                                {
                                  value: new Date('2018-04-01')
                                },
                                {
                                  value: new Date('2018-05-01')
                                },
                                {
                                  value: new Date('2018-06-01')
                                },
                                {
                                  value: new Date('2018-07-01')
                                },
                                {
                                  value: new Date('2018-08-01')
                                },
                                {
                                  value: new Date('2018-09-01')
                                },
                                {
                                  value: new Date('2018-10-01')
                                },
                                {
                                  value: new Date('2018-11-01')
                                },
                                {
                                  value: new Date('2018-12-01')
                                },
                                {
                                  value: new Date('2018-12-31')
                                }
                                ],
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
            }
      }
      else{
        this.chartOptions2018 = {
          backgroundColor: "#E0FFE0",
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: `Precios año ${anio}`
          },
          data: []
        };
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
        if (respuesta && respuesta.length >= 2) {
          this.dataShareslist = respuesta;

                      this.chartOptions2019 = {
                        backgroundColor: "#EEFFEE",
                        theme: "light2",
                        animationEnabled: true,
                        zoomEnabled: true,
                        title: {
                          text: `Precios año ${anio}`
                        },
                        axisX: {
                          labelFontSize: 12,
                          intervalType: "month",
                          interval: 1,
                          minimum: new Date('2019-01-01'),
                          maximum: new Date('2020-01-01'),
                          stripLines:[
                            {
                              value: new Date('2019-01-01')
                            },
                            {
                              value: new Date('2019-02-01')
                            },
                            {
                              value: new Date('2019-03-01')
                            },
                            {
                              value: new Date('2019-04-01')
                            },
                            {
                              value: new Date('2019-05-01')
                            },
                            {
                              value: new Date('2019-06-01')
                            },
                            {
                              value: new Date('2019-07-01')
                            },
                            {
                              value: new Date('2019-08-01')
                            },
                            {
                              value: new Date('2019-09-01')
                            },
                            {
                              value: new Date('2019-10-01')
                            },
                            {
                              value: new Date('2019-11-01')
                            },
                            {
                              value: new Date('2019-12-01')
                            },
                            {
                              value: new Date('2019-12-31')
                            }
                            ],
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
        }
      }
       else{
        this.chartOptions2019 = {
          backgroundColor: "#EEFFEE",
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: `Precios año ${anio}`
          },
          data: []
        };
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
        if (respuesta && respuesta.length >= 2) {
          this.dataShareslist = respuesta;


                              this.chartOptions2020 = {
                                backgroundColor: "#E0FFE0",
                                theme: "light2",
                                animationEnabled: true,
                                zoomEnabled: true,
                                title: {
                                  text: `Precios año ${anio}`
                                },
                                axisX: {
                                  labelFontSize: 12,
                                  intervalType: "month",
                                  interval: 1,
                                  minimum: new Date('2020-01-01'),
                                  maximum: new Date('2021-01-01'),
                                  stripLines:[
                                    {
                                      value: new Date('2020-01-01')
                                    },
                                    {
                                      value: new Date('2020-02-01')
                                    },
                                    {
                                      value: new Date('2020-03-01')
                                    },
                                    {
                                      value: new Date('2020-04-01')
                                    },
                                    {
                                      value: new Date('2020-05-01')
                                    },
                                    {
                                      value: new Date('2020-06-01')
                                    },
                                    {
                                      value: new Date('2020-07-01')
                                    },
                                    {
                                      value: new Date('2020-08-01')
                                    },
                                    {
                                      value: new Date('2020-09-01')
                                    },
                                    {
                                      value: new Date('2020-10-01')
                                    },
                                    {
                                      value: new Date('2020-11-01')
                                    },
                                    {
                                      value: new Date('2020-12-01')
                                    },
                                    {
                                      value: new Date('2020-12-31')
                                    }
                                    ],
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
                              }
      }
       else{
        this.chartOptions2020 = {
          backgroundColor: "#E0FFE0",
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: `Precios año ${anio}`
          },
          data: []
        };
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
        if (respuesta && respuesta.length >= 2) {
          this.dataShareslist = respuesta;


                        this.chartOptions2021 = {
                          backgroundColor: "#EEFFEE",
                          theme: "light2",
                          animationEnabled: true,
                          zoomEnabled: true,
                          title: {
                            text: `Precios año ${anio}`
                          },
                          axisX: {
                            labelFontSize: 12,
                            intervalType: "month",
                            interval: 1,
                            minimum: new Date('2021-01-01'),
                            maximum: new Date('2022-01-01'),
                              stripLines:[
                              {
                                value: new Date('2021-01-01')
                              },
                              {
                                value: new Date('2021-02-01')
                              },
                              {
                                value: new Date('2021-03-01')
                              },
                              {
                                value: new Date('2021-04-01')
                              },
                              {
                                value: new Date('2021-05-01')
                              },
                              {
                                value: new Date('2021-06-01')
                              },
                              {
                                value: new Date('2021-07-01')
                              },
                              {
                                value: new Date('2021-08-01')
                              },
                              {
                                value: new Date('2021-09-01')
                              },
                              {
                                value: new Date('2021-10-01')
                              },
                              {
                                value: new Date('2021-11-01')
                              },
                              {
                                value: new Date('2021-12-01')
                              },
                              {
                                value: new Date('2021-12-31')
                              }
                              ],
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
                        }
      }
        else{
        this.chartOptions2021 = {
          backgroundColor: "#EEFFEE",
          theme: "light2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: `Precios año ${anio}`
          },
          data: []
        };
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
      if (respuesta && respuesta.length >= 2) {
        this.dataShareslist = respuesta;



                            this.chartOptions2022 = {
                              backgroundColor: "#E0FFE0",
                              theme: "light2",
                              animationEnabled: true,
                              zoomEnabled: true,
                              title: {
                                text: `Precios año ${anio}`
                              },
                              axisX: {
                                labelFontSize: 12,
                                intervalType: "month",
                                interval: 1,
                                minimum: new Date('2022-01-01'),
                                maximum: new Date('2023-01-01'),
                                stripLines:[
                                  {
                                    value: new Date('2022-01-01')
                                  },
                                  {
                                    value: new Date('2022-02-01')
                                  },
                                  {
                                    value: new Date('2022-03-01')
                                  },
                                  {
                                    value: new Date('2022-04-01')
                                  },
                                  {
                                    value: new Date('2022-05-01')
                                  },
                                  {
                                    value: new Date('2022-06-01')
                                  },
                                  {
                                    value: new Date('2022-07-01')
                                  },
                                  {
                                    value: new Date('2022-08-01')
                                  },
                                  {
                                    value: new Date('2022-09-01')
                                  },
                                  {
                                    value: new Date('2022-10-01')
                                  },
                                  {
                                    value: new Date('2022-11-01')
                                  },
                                  {
                                    value: new Date('2022-12-01')
                                  },
                                  {
                                    value: new Date('2022-12-31')
                                  }
                                  ],
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
                            }
    }else{
      this.chartOptions2022 = {
        backgroundColor: "#E0FFE0",
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
        },
        data: []
      };
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
      if (respuesta && respuesta.length >= 2) {
        this.dataShareslist = respuesta;


                          this.chartOptions2023 = {
                            backgroundColor: "#EEFFEE",
                            theme: "light2",
                            animationEnabled: true,
                            zoomEnabled: true,
                            title: {
                              text: `Precios año ${anio}`
                            },
                            axisX: {
                              labelFontSize: 12,
                              intervalType: "month",
                              interval: 1,
                              minimum: new Date('2023-01-01'),
                              maximum: new Date('2024-01-01'),
                              stripLines:[
                                {
                                  value: new Date('2023-01-01')
                                },
                                {
                                  value: new Date('2023-02-01')
                                },
                                {
                                  value: new Date('2023-03-01')
                                },
                                {
                                  value: new Date('2023-04-01')
                                },
                                {
                                  value: new Date('2023-05-01')
                                },
                                {
                                  value: new Date('2023-06-01')
                                },
                                {
                                  value: new Date('2023-07-01')
                                },
                                {
                                  value: new Date('2023-08-01')
                                },
                                {
                                  value: new Date('2023-09-01')
                                },
                                {
                                  value: new Date('2023-10-01')
                                },
                                {
                                  value: new Date('2023-11-01')
                                },
                                {
                                  value: new Date('2023-12-01')
                                },
                                {
                                  value: new Date('2023-12-31')
                                }
                                ],
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
                          }
    }
    else{
      this.chartOptions2023 = {
        backgroundColor: "#EEFFEE",
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
        },
        data: []
      };
    };


    this.cdr.detectChanges();
    },
    err => {
      console.log('Error de conexion');
    }
  );

  }



  ConstruirGraficoEmisorAnio2024(anio: string): void{
    const {cmbEmisor, cmbPrueba} = this.formAcciones.value
    const observador2024$ = this.searchService.ObtenerAccionesCompaniaAnio$(cmbEmisor,anio)
  .subscribe(
    (respuesta: SharesModel[]) => {
      if (respuesta && respuesta.length >= 2) {
        this.dataShareslist = respuesta;

                      this.chartOptions2024 = {
                        backgroundColor: "#E0FFE0",
                        theme: "light2",
                        animationEnabled: true,
                        zoomEnabled: true,
                        title: {
                          text: `Precios año ${anio}`
                        },
                        axisX: {
                          labelFontSize: 12,
                          intervalType: "month",
                          interval: 1,
                          minimum: new Date('2024-01-01'),
                          maximum: new Date('2025-01-01'),
                          stripLines:[
                            {
                              value: new Date('2024-01-01')
                            },
                            {
                              value: new Date('2024-02-01')
                            },
                            {
                              value: new Date('2024-03-01')
                            },
                            {
                              value: new Date('2024-04-01')
                            },
                            {
                              value: new Date('2024-05-01')
                            },
                            {
                              value: new Date('2024-06-01')
                            },
                            {
                              value: new Date('2024-07-01')
                            },
                            {
                              value: new Date('2024-08-01')
                            },
                            {
                              value: new Date('2024-09-01')
                            },
                            {
                              value: new Date('2024-10-01')
                            },
                            {
                              value: new Date('2024-11-01')
                            },
                            {
                              value: new Date('2024-12-01')
                            },
                            {
                              value: new Date('2024-12-31')
                            }
                            ],
                        },
                        axisY: {
                        // minimum: 1.40,
                        // maximum: 2.40,
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
                      }
    }else{
      this.chartOptions2024 = {
        backgroundColor: "#E0FFE0",
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `Precios año ${anio}`
        },
        data: []
      };
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
      this.ConstruirGraficoEmisorAnio2024('2024');
      this.PresentarInformacionDividendos();


    }




}
