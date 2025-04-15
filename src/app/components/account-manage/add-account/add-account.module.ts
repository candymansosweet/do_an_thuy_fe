import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAccountComponent } from './add-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule
  ],
  exports: [
    AddAccountComponent
  ]
})
export class AddAccountModule { }
