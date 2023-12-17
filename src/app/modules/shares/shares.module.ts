import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharesRoutingModule } from './shares-routing.module';
import { SharesPageComponent } from './pages/shares-page/shares-page.component';
import { SharedModule } from '@shared/shared.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SharesPageComponent,
  ],
  imports: [
    CommonModule,
    SharesRoutingModule,
    SharedModule,
    CanvasJSAngularChartsModule,
    ReactiveFormsModule
  ]
})
export class SharesModule { }
