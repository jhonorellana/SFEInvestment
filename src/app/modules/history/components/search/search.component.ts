import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  @Output() devuelveData:EventEmitter<any> = new EventEmitter()

      cmbMes: string ="";
      cmbAnio: string ="";
      FechaActual = new Date();

     constructor(){}

  ngOnInit(): void {
        this.cmbMes = (this.FechaActual.getMonth() + 1).toString();
        this.cmbAnio = (this.FechaActual.getFullYear()).toString();

  }

  enviaConsulta(textoModificado: string):void{
    console.log('Emitiendo desde el Hijo .....👍😊❤',textoModificado);
    this.devuelveData.emit([this.cmbAnio,this.cmbMes ])
    /*
         if (textoModificado.length>=1)
         {
          this.devuelveData.emit(textoModificado)
         }
     */

  }


}
