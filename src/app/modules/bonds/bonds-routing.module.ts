import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BondsComponent } from './bonds.component';

const routes: Routes = [
  {
    path: '',
    component: BondsComponent,
    outlet:'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BondsRoutingModule { }
