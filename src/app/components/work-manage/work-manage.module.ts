import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkManageRoutingModule } from './work-manage-routing.module';
import { WorkManageComponent } from './work-manage.component';


@NgModule({
  declarations: [
    WorkManageComponent
  ],
  imports: [
    CommonModule,
    WorkManageRoutingModule
  ]
})
export class WorkManageModule { }
