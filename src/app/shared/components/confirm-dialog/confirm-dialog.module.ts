import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    DialogModule,
    ButtonModule,
    CommonModule,
  ], 
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule { }
