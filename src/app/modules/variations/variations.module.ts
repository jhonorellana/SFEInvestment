import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationsRoutingModule } from './variations-routing.module';
import { VariationsPageComponent } from './pages/variations-page/variations-page.component';


@NgModule({
  declarations: [
    VariationsPageComponent
  ],
  imports: [
    CommonModule,
    VariationsRoutingModule
  ]
})
export class VariationsModule { }
