import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharesRoutingModule } from './shares-routing.module';
import { SharesPageComponent } from './pages/shares-page/shares-page.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SharesPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharesRoutingModule,
    SharedModule
  ]
})
export class SharesModule { }
