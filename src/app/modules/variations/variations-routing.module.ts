import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariationsPageComponent } from './pages/variations-page/variations-page.component';

const routes: Routes = [
  {
  path: '',
  component: VariationsPageComponent,
  outlet:'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationsRoutingModule { }
