import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskManageComponent } from './task-manage.component';
import { TaskManageRoutingModule } from './task-manage-routing.module';
import { AddTaskModule } from './add-task/add-task.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { InputTextModule } from 'primeng/inputtext';
import { DetailTaskModule } from './detail-task/detail-task.module';
@NgModule({
  declarations: [
    TaskManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskManageRoutingModule,
    AddTaskModule,
    ConfirmDialogModule,
    DropdownModule,
    PipeModule,
    InputTextModule,
    DetailTaskModule
  ]
})
export class TaskManageModule { }