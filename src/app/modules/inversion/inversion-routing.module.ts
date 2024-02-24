import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionPageComponent } from './pages/inversion-page/inversion-page.component';

const routes: Routes = [
  {
    path: '',
    component: InversionPageComponent,
    outlet:'child'
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InversionRoutingModule { }
