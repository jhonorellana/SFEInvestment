import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthervaluePageComponent } from './pages/othervalue-page/othervalue-page.component';

const routes: Routes = [
  {
    path: '',
    component: OthervaluePageComponent,
    outlet:'child'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthervalueRoutingModule { }
