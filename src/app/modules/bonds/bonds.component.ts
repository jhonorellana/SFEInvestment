import { Component } from '@angular/core';
import { BondsService } from './bonds.service';
import { BonosModel } from '@core/models/bonos.model';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent {

  dataBonoslist: Array<BonosModel> = []

  constructor(private bondsService: BondsService){}

  ngOnInit(): void{
    this.bondsService.getBonos$()
    .subscribe((response: BonosModel[]) => {
                  this.dataBonoslist = response;
                  this.dataBonoslist.pop();
                  console.log(this.dataBonoslist);
                }, err => {console.log('Error de conexion');}
               )
  }
}
