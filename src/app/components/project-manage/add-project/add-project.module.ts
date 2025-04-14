import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { DialogCommonModule } from 'src/app/shared/modules/dialog-common/dialog-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    DialogCommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  exports: [
    AddProjectComponent
  ]
})
export class AddProjectModule { }
