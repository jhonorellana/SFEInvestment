import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalancePageComponent } from './pages/balance-page/balance-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BalancePageComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BalanceModule { }
