import { Component, Input, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @Input() position = 'top-right';
    @Input() key = 'default';

    constructor(
      private messageService: MessageService,
      private primengConfig: PrimeNGConfig,
      private notification: NotificationService,
    ) { }

    ngOnInit() {
      this.primengConfig.ripple = true;
    }

    onConfirm() {
      this.notification.clearError();
    }
}
