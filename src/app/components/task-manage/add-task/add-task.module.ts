import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCommonModule } from 'src/app/shared/modules/dialog-common/dialog-common.module';
import { AddTaskComponent } from './add-task.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    DialogCommonModule,
    FileUploadModule,
    ButtonModule
  ],
  exports: [
    AddTaskComponent
  ]
})
export class AddTaskModule { }