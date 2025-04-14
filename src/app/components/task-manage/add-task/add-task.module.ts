import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCommonModule } from 'src/app/shared/modules/dialog-common/dialog-common.module';
import { AddTaskComponent } from './add-task.component';

@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    DialogCommonModule
  ],
  exports: [
    AddTaskComponent
  ]
})
export class AddTaskModule { }