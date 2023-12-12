import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    StatisticsPageComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule
  ]
})
export class StatisticsModule { }
