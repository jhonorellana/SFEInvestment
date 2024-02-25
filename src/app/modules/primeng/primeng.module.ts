import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MOLULOS DE LA LIBRERIA PRIMENG
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule} from 'primeng/rating';
import { TagModule} from 'primeng/tag';
import { DialogModule} from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';









@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    PanelModule,
    InputTextModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    RatingModule,
    TagModule,
    DataViewModule,
    DialogModule,
    CheckboxModule,
    FieldsetModule,
    InputTextareaModule,
    MultiSelectModule,
    CalendarModule

  ],
  exports:[
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    PanelModule,
    InputTextModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    DataViewModule,
    RatingModule,
    TagModule,
    DialogModule,
    CheckboxModule,
    FieldsetModule,
    InputTextareaModule,
    MultiSelectModule,
    CalendarModule
  ]
})
export class PrimengModule { }
