import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManageComponent } from './account-manage.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';
import { AccountManageRoutingModule } from './account-manage-routing.module';
import { AddAccountModule } from './add-account/add-account.module';
import { EditAccountModule } from './edit-account/edit-account.module';

@NgModule({
  declarations: [
    AccountManageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AccountManageRoutingModule,
    PaginatorModule,
    AddAccountModule,
    EditAccountModule,
    ConfirmDialogModule,
    CommonTableModule
  ],
  exports: [
    AccountManageComponent
  ]
})
export class AccountManageModule { }
