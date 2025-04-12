import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManageComponent } from './staff-manage.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StaffManageRoutingModule } from './staff-manage-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { AddStaffModule } from './add-staff/add-staff.module';
import { EditStaffModule } from './edit-staff/edit-staff.module';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
@NgModule({
  declarations: [
    StaffManageComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    StaffManageRoutingModule,
    PaginatorModule,
    AddStaffModule,
    EditStaffModule,
    ConfirmDialogModule
  ],
  exports: [
    StaffManageComponent
  ]
})
export class StaffManageModule { }
