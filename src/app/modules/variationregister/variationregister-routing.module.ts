import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariationregisterPageComponent } from './pages/variationregister-page/variationregister-page.component';

const routes: Routes = [
  {
    path: '',
    component: VariationregisterPageComponent,
    outlet:'child'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationregisterRoutingModule { }
