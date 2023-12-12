import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { SharedModule } from '@shared/shared.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    PortfolioPageComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule,
    CanvasJSAngularChartsModule
  ]
})
export class PortfolioModule { }
