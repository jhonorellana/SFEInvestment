import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyoverviewService } from '@modules/daylyoverview/services/dailyoverview.service';
import { UltimafechaaccionModel } from '@core/models/ultimafechaaccion.model';
import { HistoricoaccionesModel } from '@core/models/historicoacciones.model';
import { HistoricobonosModel } from '@core/models/historicobonos.model';
import { HistoricoobligacionesModel } from '@core/models/historicoobligaciones.model';
import { HistoricopapelesModel } from '@core/models/historicopapeles.model';
import { HistoricofacturasModel } from '@core/models/historicofacturas.model';
import { HistoricogenericosModel } from '@core/models/historicogenericos.model';

@Component({
  selector: 'app-dailyoverview-page',
  templateUrl: './dailyoverview-page.component.html',
  styleUrls: ['./dailyoverview-page.component.css']
})
export class DailyoverviewPageComponent implements OnInit{

  dataAccionesDelDia: Array<HistoricoaccionesModel> = []
  dataBonosDelDia: Array<HistoricobonosModel> = []
  dataObligacionesDelDia: Array<HistoricoobligacionesModel> = []
  dataPapelesDelDia: Array<HistoricopapelesModel> = []
  dataFacturasDelDia: Array<HistoricofacturasModel> = []
  dataGenericosDelDia: Array<HistoricogenericosModel> = []
  dataUltimaFechaAcciones: Array<UltimafechaaccionModel> = []

  formBusqueda: FormGroup = new FormGroup({})
  FechaActual = new Date();

  _fechaInicio: string="";
  _fechaFin: string="";

  constructor(private dailyoverviewService: DailyoverviewService){}

  ngOnInit(): void {


    const unDiaAntes = new Date(this.FechaActual.getTime() - 24 * 60 * 60 * 1000); // Resta un día en milisegundos
    this._fechaInicio = unDiaAntes.toISOString().slice(0, 10); // Formatea la fecha como string 'yyyy-mm-dd'

    this._fechaFin = new Date().toISOString().slice(0, 10);

    this.formBusqueda = new FormGroup({
      fechaInicio: new FormControl(`${this._fechaInicio}`,[
        Validators.required
        // Validators.minLength(10),
        // Validators.maxLength(10)
      ]),

      fechaFin: new FormControl(`${this._fechaFin}`,[
        Validators.required
        //Validators.minLength(10),
        //Validators.maxLength(10)
      ]),
     }
    )


    this.dailyoverviewService.ConsultarAccionesDelDia$(this._fechaInicio,this._fechaFin)
          .subscribe((response: HistoricoaccionesModel[]) => {
                        this.dataAccionesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )


    this.dailyoverviewService.ConsultarBonosDelDia$(this._fechaInicio,this._fechaFin)
          .subscribe((response: HistoricobonosModel[]) => {
                        this.dataBonosDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )


    this.dailyoverviewService.ConsultarObligacionesDelDia$(this._fechaInicio,this._fechaFin)
          .subscribe((response: HistoricoobligacionesModel[]) => {
                        this.dataObligacionesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarPapelesDelDia$(this._fechaInicio,this._fechaFin)
          .subscribe((response: HistoricopapelesModel[]) => {
                        this.dataPapelesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarFacturasDelDia$(this._fechaInicio,this._fechaFin)
          .subscribe((response: HistoricofacturasModel[]) => {
                        this.dataFacturasDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarGenericosDelDia$(this._fechaInicio,this._fechaFin)
    .subscribe((response: HistoricogenericosModel[]) => {
                  this.dataGenericosDelDia = response
                }, err => {console.log('Error de conexion');}
              )




    this.dailyoverviewService.ConsultarUltimaFechaAcciones$()
          .subscribe((response: UltimafechaaccionModel[]) => {
                        this.dataUltimaFechaAcciones = response
                      }, err => {console.log('Error de conexion');}
                    )



  }


  enviarConsulta():void{

    const { fechaInicio, fechaFin} = this.formBusqueda.value

    this.dailyoverviewService.ConsultarAccionesDelDia$(fechaInicio,fechaFin)
    .subscribe((response: HistoricoaccionesModel[]) => {
                  this.dataAccionesDelDia = response
                }, err => {console.log('Error de conexion');}
              )


    this.dailyoverviewService.ConsultarBonosDelDia$(fechaInicio,fechaFin)
    .subscribe((response: HistoricobonosModel[]) => {
                  this.dataBonosDelDia = response
                }, err => {console.log('Error de conexion');}
              )


    this.dailyoverviewService.ConsultarObligacionesDelDia$(fechaInicio,fechaFin)
    .subscribe((response: HistoricoobligacionesModel[]) => {
                  this.dataObligacionesDelDia = response
                }, err => {console.log('Error de conexion');}
              )

    this.dailyoverviewService.ConsultarPapelesDelDia$(fechaInicio,fechaFin)
          .subscribe((response: HistoricopapelesModel[]) => {
                        this.dataPapelesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarFacturasDelDia$(fechaInicio,fechaFin)
          .subscribe((response: HistoricofacturasModel[]) => {
                        this.dataFacturasDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarGenericosDelDia$(fechaInicio,fechaFin)
    .subscribe((response: HistoricogenericosModel[]) => {
                  this.dataGenericosDelDia = response
                }, err => {console.log('Error de conexion');}
              )




    this.dailyoverviewService.ConsultarUltimaFechaAcciones$()
          .subscribe((response: UltimafechaaccionModel[]) => {
                        this.dataUltimaFechaAcciones = response
                      }, err => {console.log('Error de conexion');}
                    )





  }
}
