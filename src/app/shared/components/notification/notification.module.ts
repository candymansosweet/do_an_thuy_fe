import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    RippleModule,
    FormsModule,
    ButtonModule
  ],
  exports: [NotificationComponent],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
