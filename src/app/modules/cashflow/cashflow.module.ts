import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { CashflowRoutingModule } from './cashflow-routing.module';
import { CashflowPageComponent } from './pages/cashflow-page/cashflow-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CashflowPageComponent,
  ],
  imports: [
    CommonModule,
    CashflowRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CashflowModule { }
