import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCommonModule } from 'src/app/shared/modules/dialog-common/dialog-common.module';
import { DetailTaskComponent } from './detail-task.component';
import { DialogLayoutModule } from 'src/app/shared/components/dialog-layout/dialog-layout.module';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    DetailTaskComponent
  ],
  imports: [
    CommonModule,
    DialogCommonModule,
    DialogLayoutModule,
    PipeModule,
    ConfirmDialogModule,

  ],
  exports: [
    DetailTaskComponent

  ]
})
export class DetailTaskModule { }