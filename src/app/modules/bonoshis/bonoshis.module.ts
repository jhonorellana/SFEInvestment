import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonoshisRoutingModule } from './bonoshis-routing.module';
import { BonoshisPageComponent } from './pages/bonoshis-page/bonoshis-page.component';
import { SharedModule } from '@shared/shared.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@NgModule({
  declarations: [
    BonoshisPageComponent
  ],
  imports: [
    CommonModule,
    BonoshisRoutingModule,
    SharedModule,
    CanvasJSAngularChartsModule
  ]
})
export class BonoshisModule { }
