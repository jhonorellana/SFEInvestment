import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardMonthComponent } from './components/card-month/card-month.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { IndicatorsHeaderComponent } from './components/indicators-header/indicators-header.component';
import { IndicatorsBodyComponent } from './components/indicators-body/indicators-body.component';
import { RouterModule } from '@angular/router';
import { SectionSummaryComponent } from './components/section-summary/section-summary.component';
import { BalanceDetailComponent } from './components/balance-detail/balance-detail.component';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    FooterComponent,
    CardMonthComponent,
    SectionGenericComponent,
    IndicatorsHeaderComponent,
    IndicatorsBodyComponent,
    SectionSummaryComponent,
    BalanceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideBarComponent,
    HeaderUserComponent,
    FooterComponent,
    CardMonthComponent,
    SectionGenericComponent,
    SectionSummaryComponent,
    IndicatorsHeaderComponent,
    IndicatorsBodyComponent,
    BalanceDetailComponent
  ]
})
export class SharedModule { }
