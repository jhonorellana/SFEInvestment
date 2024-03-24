import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonoshisPageComponent } from './pages/bonoshis-page/bonoshis-page.component';

const routes: Routes = [
  {
    path: '',
    component: BonoshisPageComponent,
    outlet:'child'
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonoshisRoutingModule { }
