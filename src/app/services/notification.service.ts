import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private messageService: MessageService
  ) {
  }

  clearError() {
    this.messageService.clear('error');
  }

  info(summary: string, detail: string = '', key = 'default') {
    this.messageService.add({severity: 'info', summary: summary, detail: detail, key: key, life: 3000});
  }

  success(summary: string, detail: string = '', key = 'default') {
    this.messageService.add({severity: 'success', summary: summary, detail: detail, key: key, life: 3000});
  }

  warn(summary: string, detail: string = '', key = 'default') {
    this.messageService.add({severity: 'warn', summary: summary, detail: detail, key: key, life: 3000});
  }

  error(summary: any, detail: string = '', key = 'default') {
    let message = '';
    if (typeof summary === 'object' && summary.error) {
      message = summary.error.errors;
    } else if (typeof summary === 'string') {
      message = summary
    } else {
      message = 'Có lỗi xảy ra'
    }
    this.messageService.add({severity: 'error', summary: message, detail: detail, key: key,  life: 3000});
  }

  add(type: string, summary: string, detail: string = '', key = 'default', sticky = false) {
    this.messageService.add({key: key, severity: type, summary: summary, detail: detail, sticky: sticky, life: sticky ? undefined : 3000});
  }
}
