import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStaffComponent } from './edit-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [
        EditStaffComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        DialogModule
    ],
    exports: [
        EditStaffComponent
    ]
})
export class EditStaffModule { }
