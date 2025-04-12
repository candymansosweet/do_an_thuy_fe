import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStaffComponent } from './add-staff.component';
import { DialogCommonModule } from 'src/app/shared/modules/dialog-common/dialog-common.module';



@NgModule({
  declarations: [
    AddStaffComponent
  ],
  imports: [
    CommonModule,
    DialogCommonModule
  ],
  exports: [
    AddStaffComponent
  ]
})
export class AddStaffModule { }
