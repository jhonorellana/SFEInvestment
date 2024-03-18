import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyoverviewService } from '@modules/daylyoverview/services/dailyoverview.service';
import { UltimafechaaccionModel } from '@core/models/ultimafechaaccion.model';
import { HistoricoaccionesModel } from '@core/models/historicoacciones.model';
import { HistoricobonosModel } from '@core/models/historicobonos.model';
import { HistoricoobligacionesModel } from '@core/models/historicoobligaciones.model';
import { HistoricopapelesModel } from '@core/models/historicopapeles.model';

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
  dataUltimaFechaAcciones: Array<UltimafechaaccionModel> = []
  constructor(private dailyoverviewService: DailyoverviewService){}

  ngOnInit(): void {



    this.dailyoverviewService.ConsultarAccionesDelDia$()
          .subscribe((response: HistoricoaccionesModel[]) => {
                        this.dataAccionesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )


    this.dailyoverviewService.ConsultarBonosDelDia$()
          .subscribe((response: HistoricobonosModel[]) => {
                        this.dataBonosDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )


    this.dailyoverviewService.ConsultarObligacionesDelDia$()
          .subscribe((response: HistoricoobligacionesModel[]) => {
                        this.dataObligacionesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )

    this.dailyoverviewService.ConsultarPapelesDelDia$()
          .subscribe((response: HistoricopapelesModel[]) => {
                        this.dataPapelesDelDia = response
                      }, err => {console.log('Error de conexion');}
                    )


    this.dailyoverviewService.ConsultarUltimaFechaAcciones$()
          .subscribe((response: UltimafechaaccionModel[]) => {
                        this.dataUltimaFechaAcciones = response
                      }, err => {console.log('Error de conexion');}
                    )



  }
}
