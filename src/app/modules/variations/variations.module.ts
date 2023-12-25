import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationsRoutingModule } from './variations-routing.module';
import { VariationsPageComponent } from './pages/variations-page/variations-page.component';
import { SharedModule } from '@shared/shared.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    VariationsPageComponent
  ],
  imports: [
    CommonModule,
    VariationsRoutingModule,
    SharedModule,
    CanvasJSAngularChartsModule
  ]
})
export class VariationsModule { }
