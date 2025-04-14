import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './edit-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [
        EditProjectComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        DialogModule,
        MultiSelectModule,
        CalendarModule,
        InputTextareaModule
    ],
    exports: [
        EditProjectComponent
    ]
})
export class EditProjectModule { }
