import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManageComponent } from './task-manage.component';
const routes: Routes = [
  { path: '', component: TaskManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManageRoutingModule { }