import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionRoutingModule } from './inversion-routing.module';
import { InversionPageComponent } from './pages/inversion-page/inversion-page.component';
import { SharedModule } from '@shared/shared.module';
import { PrimengModule } from '@modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InversionPageComponent
  ],
  imports: [
    CommonModule,
    InversionRoutingModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class InversionModule { }
