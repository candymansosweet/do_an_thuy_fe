import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManageRoutingModule } from './project-manage-routing.module';
import { ProjectManageComponent } from './project-manage.component';


@NgModule({
  declarations: [
    ProjectManageComponent
  ],
  imports: [
    CommonModule,
    ProjectManageRoutingModule
  ]
})
export class ProjectManageModule { }
