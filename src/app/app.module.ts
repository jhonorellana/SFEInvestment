import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

//import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
