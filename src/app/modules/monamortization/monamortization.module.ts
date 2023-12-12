import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonamortizationRoutingModule } from './monamortization-routing.module';
import { MonamortizationPageComponent } from './pages/monamortization-page/monamortization-page.component';


@NgModule({
  declarations: [
    MonamortizationPageComponent
  ],
  imports: [
    CommonModule,
    MonamortizationRoutingModule,
  ]
})
export class MonamortizationModule { }
