import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { DaylyoverviewRoutingModule } from './daylyoverview-routing.module';
import { DailyoverviewPageComponent } from './pages/dailyoverview-page/dailyoverview-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DailyoverviewPageComponent
  ],
  imports: [
    CommonModule,
    DaylyoverviewRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DaylyoverviewModule { }
