import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyoverviewPageComponent } from './pages/dailyoverview-page/dailyoverview-page.component';

const routes: Routes = [
  {
    path: '',
    component: DailyoverviewPageComponent,
    outlet:'child'
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaylyoverviewRoutingModule { }
