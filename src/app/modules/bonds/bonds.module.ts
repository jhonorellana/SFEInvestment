import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BondsRoutingModule } from './bonds-routing.module';
import { BondsComponent } from './bonds.component';
import { PrimengModule } from '@modules/primeng/primeng.module';


@NgModule({
  declarations: [
    BondsComponent
  ],
  imports: [
    PrimengModule,
    CommonModule,
    BondsRoutingModule
  ]
})
export class BondsModule { }
