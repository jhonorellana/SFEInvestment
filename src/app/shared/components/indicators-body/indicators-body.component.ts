import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../data/shares.json'
import { SharesModel } from '@core/models/shares';

@Component({
  selector: 'app-indicators-body',
  templateUrl: './indicators-body.component.html',
  styleUrls: ['./indicators-body.component.css']
})
export class IndicatorsBodyComponent implements OnInit{
  shares: SharesModel[] = []

  constructor(){}

  ngOnInit(): void {
    const data: any = (dataRaw as any).default
    this.shares = data;
  }

}


