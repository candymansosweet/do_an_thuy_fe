import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from './dialog-layout.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';



@NgModule({
  declarations: [
    DialogLayoutComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    PipeModule
  ],
  exports: [
    DialogLayoutComponent
  ]
})
export class DialogLayoutModule { }
