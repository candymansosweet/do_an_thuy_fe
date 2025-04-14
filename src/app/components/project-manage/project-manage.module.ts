import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManageRoutingModule } from './project-manage-routing.module';
import { ProjectManageComponent } from './project-manage.component';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { AddProjectModule } from './add-project/add-project.module';
import { EditProjectModule } from './edit-project/edit-project.module';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';
import { ButtonModule } from 'primeng/button';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';


@NgModule({
  declarations: [
    ProjectManageComponent
  ],
  imports: [
    CommonModule,
    ProjectManageRoutingModule,
    ConfirmDialogModule,
    EditProjectModule,
    AddProjectModule,
    CommonTableModule,
    ButtonModule,
    PipeModule
  ]
})
export class ProjectManageModule { }
