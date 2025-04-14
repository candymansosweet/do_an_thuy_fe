import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeObjectNamePipe } from './merge-object-name.pipe';
import { TaskStatusPipe } from './task-status.pipe';
@NgModule({
    declarations: [
        MergeObjectNamePipe,
        TaskStatusPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        MergeObjectNamePipe,
        TaskStatusPipe
    ],
    providers: []
})
export class PipeModule { }
