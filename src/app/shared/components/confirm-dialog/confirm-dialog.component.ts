import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  _visible = false;
  @Input() set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }
  get visible() {
    return this._visible;
  }
  @Output() visibleChange = new EventEmitter<any>();

  @Input() confirmText = '';
  @Input() confirmLabel = 'Xóa';
  @Input() cancelLabel = 'Hủy';
  @Input() styleClassConfirm = 'p-button-text p-button-sm p-button-danger';
  @Input() styleClassCancel = 'p-button-text p-button-sm';
  @Input() closable = true;
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.visible = false;
    this.onCancel.emit();
  }

  confirm() {
    this.visible = false;
    this.onConfirm.emit();
  }
}
