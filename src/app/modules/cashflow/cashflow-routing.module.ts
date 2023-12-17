import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashflowPageComponent } from './pages/cashflow-page/cashflow-page.component';

const routes: Routes = [
  {
    path: '',
    component: CashflowPageComponent,
    outlet:'child'
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashflowRoutingModule { }
