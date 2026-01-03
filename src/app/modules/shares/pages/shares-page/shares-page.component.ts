import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharesModel } from '@core/models/shares.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { DividendosModel } from '@core/models/dividendos.model';
import { SimulacionModel } from '@core/models/simulacion.model';
import { CanvasJS } from '@canvasjs/angular-charts';

interface ChartOptions {
  [key: string]: any;
}

interface ChartDataPoint {
  x: Date;
  y: number;
  data: {
    transacciones: number;
    cantidad: number;
    valor: number;
    emisor: string;
  };
}

interface TooltipEntry {
  dataPoint: {
    x: Date;
    y: number;
    data: {
      transacciones: number;
      cantidad: number;
      valor: number;
      emisor: string;
    };
  };
}

interface TooltipEvent {
  entries: TooltipEntry[];
}

@Component({
  selector: 'app-shares-page',
  templateUrl: './shares-page.component.html',
  styleUrls: ['./shares-page.component.css']
})
export class SharesPageComponent implements OnInit, OnDestroy {
  formAcciones: FormGroup = new FormGroup({});
  formSimulacion: FormGroup = new FormGroup({});

  private listaObservadores: Subscription[] = [];
  dataShareslist: SharesModel[] = [];
  dataDividendos: DividendosModel[] = [];
  dataSimulacion: SimulacionModel[] = [];

  chartOptions: ChartOptions = {
    chartOptions1: {},
    chartOptions2017: {},
    chartOptions2018: {},
    chartOptions2019: {},
    chartOptions2020: {},
    chartOptions2021: {},
    chartOptions2022: {},
    chartOptions2023: {},
    chartOptions2024: {},
    chartOptions2025: {},
    chartOptions2026: {}
  };

  private chart: any;

  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.inicializarFormularios();
    this.enviarConsulta();
  }

  private inicializarFormularios(): void {
    this.formAcciones = new FormGroup({
      cmbEmisor: new FormControl('16'),
      cmbPrueba: new FormControl('Prueba')
    });

    this.formSimulacion = new FormGroup({
      txtPrecio: new FormControl('1.5'),
      txtCapital: new FormControl('1000')
    });
  }

  enviarConsulta(): void {
    const { cmbEmisor } = this.formAcciones.value;
    if (!cmbEmisor) return;

    const sub = this.searchService.ObtenerTodasAccionesCompania$(cmbEmisor).subscribe({
      next: (respuesta: SharesModel[]) => {
        this.dataShareslist = respuesta;
        // Construir el gráfico principal
        this.construirGraficoTotal(respuesta);
        // Construir todos los gráficos anuales con los mismos datos
        this.construirTodosLosGraficosAnuales(respuesta);
        this.PresentarInformacionDividendos();
      },
      error: (err: any) => {
        console.error('Error al cargar los datos:', err);
      }
    });
    this.listaObservadores.push(sub);
  }

  enviarSimulacion(): void {
    this.PresentarSimulacion();
  }

  private construirTodosLosGraficosAnuales(datos: SharesModel[]): void {
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

    years.forEach(year => {
      const anioNum = parseInt(year, 10);
      const datosAnio = datos.filter(dato => {
        const fecha = new Date(dato.fecha);
        return fecha.getFullYear() === anioNum;
      });

      if (datosAnio.length > 0) {
        const chartKey = `chartOptions${year}`;
        this.construirGraficoConDatos(datosAnio, anioNum, chartKey);
      }
    });

    this.cdr.detectChanges();
  }

  private construirGraficoConDatos(datos: SharesModel[], anio: number, chartKey: string): void {
    this.chartOptions[chartKey] = {
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
        viewportMinimum: new Date(anio, 0, 1),
        viewportMaximum: new Date(anio, 11, 31, 23, 59, 59),
        minimum: new Date(anio, 0, 1),
        maximum: new Date(anio, 11, 31, 23, 59, 59),
        stripLines: this.generarLineasDivisoria(anio)
      },
      axisY: {},
      toolTip: {
        shared: true,
        contentFormatter: (e: TooltipEvent) => this.formatearTooltip(e)
      },
      data: [{
        type: "line",
        xValueFormatString: "YYYY/MM/DD",
        yValueFormatString: "$#,###.##",
        dataPoints: this.mapearPuntosDatos(datos)
      }]
    };
  }

  private construirGraficoTotal(datos: SharesModel[]): void {
    this.chartOptions['chartOptions1'] = {
      backgroundColor: "#E0FFE0",
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Acciones por día desde 2017 hasta 2026"
      },
      axisX: {
        labelFontSize: 12,
        intervalType: "year",
            interval: 1,
            minimum: new Date('2017-01-01'),
            maximum: new Date('2027-01-01'),
            stripLines: this.generarLineasDivisoriaAnual()
          },
          axisY: {},
          toolTip: {
        shared: true,
        contentFormatter: (e: TooltipEvent) => this.formatearTooltip(e)
      },
      data: [{
        type: "line",
        xValueFormatString: "YYYY/MM/DD",
        yValueFormatString: "$#,###.##",
        dataPoints: this.mapearPuntosDatos(datos)
      }]
    };
    this.cdr.detectChanges();
    this.cdr.detectChanges();
  }

  private generarLineasDivisoriaAnual(): any[] {
    const stripLines = [];

    // Añadir líneas de inicio de año (1 de enero) para cada año
    for (let year = 2017; year <= 2026; year++) {
      stripLines.push({
        value: new Date(year, 0, 1),  // 1 de enero de cada año
        lineColor: "#A0A0A0",
        lineThickness: 1,
        showOnTop: true
      });
    }

    // Añadir línea para el 31 de diciembre de 2024
    stripLines.push({
      value: new Date(2024, 11, 31, 23, 59, 59),
      lineColor: "#A0A0A0",
      lineThickness: 1,
      showOnTop: true
    });

    // Añadir línea para el 31 de diciembre de 2026 (en rojo con etiqueta)
    stripLines.push({
      value: new Date(2026, 11, 31, 23, 59, 59),
      label: "31/12/2026",
      labelFontColor: "#666666",
      labelAlign: "far",
      labelBackgroundColor: "#E0FFE0",
      labelFontSize: 10,
      lineColor: "#FF0000",
      lineThickness: 1,
      showOnTop: true
    });

    return stripLines;
  }


  private crearOpcionesGrafico(
    titulo: string,
    datos: SharesModel[],
    opciones: {
      intervalType: string;
      interval: number;
      minDate: string;
      maxDate: string;
      year?: number;
    }
  ): any {
    return {
      backgroundColor: "#E0FFE0",
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: { text: titulo },
      axisX: {
        labelFontSize: 12,
        intervalType: opciones.intervalType,
        interval: opciones.interval,
        minimum: new Date(opciones.minDate),
        maximum: new Date(opciones.maxDate),
        stripLines: opciones.year ? this.generarLineasDivisoria(opciones.year) : []
      },
      axisY: {},
      toolTip: {
        shared: true,
        contentFormatter: (e: TooltipEvent) => this.formatearTooltip(e)
      },
      data: [{
        type: "line",
        xValueFormatString: "YYYY/MM/DD",
        yValueFormatString: "$#,###.##",
        dataPoints: this.mapearPuntosDatos(datos)
      }]
    };
  }

  private crearGraficoVacio(titulo: string): any {
    return {
      backgroundColor: "#E0FFE0",
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: { text: titulo },
      data: []
    };
  }

  private mapearPuntosDatos(datos: SharesModel[]): ChartDataPoint[] {
    return datos.map(entry => ({
      x: new Date(entry.fecha),
      y: entry.precio,
      data: {
        transacciones: entry.transacciones,
        cantidad: entry.cantidad,
        valor: entry.valor,
        emisor: entry.emisor
      }
    }));
  }

  private generarLineasDivisoria(anio: number): any[] {
    const stripLines = [];

    // Línea al inicio del año (1 de enero)
    stripLines.push({
      value: new Date(anio, 0, 1),
      lineColor: "#A0A0A0",
      lineThickness: 1.5,  // Línea más gruesa para inicio de año
      showOnTop: true
    });

    // Líneas mensuales (del 1 de febrero al 1 de noviembre)
    for (let month = 1; month < 11; month++) {
      stripLines.push({
        value: new Date(anio, month, 1),
        lineColor: "#F0F0F0",  // Gris muy claro para las líneas mensuales
        lineThickness: 0.8,    // Línea más fina
        showOnTop: true
      });
    }

    // Línea al inicio de diciembre (1 de diciembre)
    stripLines.push({
      value: new Date(anio, 11, 1),  // 1 de diciembre
      lineColor: "#A0A0A0",
      lineThickness: 1.5,
      showOnTop: true
    });

    // Línea al final del año (31 de diciembre) en rojo
    const endOfYear = new Date(anio, 11, 31, 12, 0, 0); // Mediodía del 31 de diciembre
    stripLines.push({
      value: endOfYear,
      lineColor: "#FF0000",  // Rojo para destacar el fin de año
      lineThickness: 1.5,
      showOnTop: true,
      label: anio === 2026 ? '31/12/2026' : '',  // Solo mostrar etiqueta para 2026
      labelFontColor: "#FF0000",
      labelAlign: "far",
      labelBackgroundColor: "#FFFFFF",
      labelFontSize: 10
    });

    return stripLines;
  }

  private formatearTooltip(e: TooltipEvent): string {
    return e.entries.map(entry => {
      const fecha = new Date(
        entry.dataPoint.x.getTime() + (entry.dataPoint.x.getTimezoneOffset() * 60000)
      );
      return `
        Emisor: ${entry.dataPoint.data.emisor}<br>
        Fecha: ${CanvasJS.formatDate(fecha, "DD/MM/YYYY")}<br>
        Precio: ${CanvasJS.formatNumber(entry.dataPoint.y, "$#,##0.00")}<br>
        Transacciones: ${CanvasJS.formatNumber(entry.dataPoint.data.transacciones, "#,###.##")}<br>
        Numero Acciones: ${CanvasJS.formatNumber(entry.dataPoint.data.cantidad, "#,###.##")}<br>
        Valor Total: ${CanvasJS.formatNumber(entry.dataPoint.data.valor, "$#,##0.00")}<br>
      `;
    }).join('');
  }

  private PresentarSimulacion(): void {
    const { txtPrecio, txtCapital } = this.formSimulacion.value;
    const { cmbEmisor } = this.formAcciones.value;

    const sub = this.searchService.ObtenerSimulacion$(cmbEmisor, txtPrecio, txtCapital)
      .subscribe({
        next: (response: SimulacionModel[]) => {
          this.dataSimulacion = response;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error en la simulación:', err);
        }
      });
    this.listaObservadores.push(sub);
  }

  private PresentarInformacionDividendos(): void {
    const { cmbEmisor } = this.formAcciones.value;
    if (!cmbEmisor) return;

    const sub = this.searchService.ObtenerDividendos$(cmbEmisor)
      .subscribe({
        next: (response: DividendosModel[]) => {
          this.dataDividendos = response;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error al cargar dividendos:', err);
        }
      });
    this.listaObservadores.push(sub);
  }

  ngOnDestroy(): void {
    this.listaObservadores.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.listaObservadores = [];
  }
}
