import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonamortizationPageComponent } from './pages/monamortization-page/monamortization-page.component';

const routes: Routes = [
  {
    path: '',
    component: MonamortizationPageComponent,
    outlet:'child'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonamortizationRoutingModule { }
