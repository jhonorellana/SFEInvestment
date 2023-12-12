import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentPageComponent } from './pages/investment-page/investment-page.component';

const routes: Routes = [
  {
  path: '',
  component: InvestmentPageComponent,
  outlet:'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule { }
