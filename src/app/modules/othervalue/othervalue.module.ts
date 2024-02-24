import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthervalueRoutingModule } from './othervalue-routing.module';
import { OthervaluePageComponent } from './pages/othervalue-page/othervalue-page.component';
import { SharedModule } from '@shared/shared.module';
import { PrimengModule } from '@modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OthervaluePageComponent
  ],
  imports: [
    CommonModule,
    OthervalueRoutingModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class OthervalueModule { }
