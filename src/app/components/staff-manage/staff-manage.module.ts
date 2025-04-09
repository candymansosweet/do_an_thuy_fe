import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManageComponent } from './staff-manage.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StaffManageRoutingModule } from './staff-manage-routing.module';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    StaffManageComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    StaffManageRoutingModule,
    PaginatorModule
  ],
  exports: [
    StaffManageComponent
  ]
})
export class StaffManageModule { }
