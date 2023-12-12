import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharesPageComponent } from './pages/shares-page/shares-page.component';

const routes: Routes = [
  {
  path: '',
  component: SharesPageComponent,
  outlet:'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharesRoutingModule { }
