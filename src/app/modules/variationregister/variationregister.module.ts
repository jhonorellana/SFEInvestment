import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationregisterRoutingModule } from './variationregister-routing.module';
import { VariationregisterPageComponent } from './pages/variationregister-page/variationregister-page.component';
import { SharedModule } from '@shared/shared.module';
import { PrimengModule } from '@modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VariationregisterPageComponent
  ],
  imports: [
    CommonModule,
    VariationregisterRoutingModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class VariationregisterModule { }
