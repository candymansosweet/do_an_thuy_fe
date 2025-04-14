import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.scss']
})
export class DialogLayoutComponent implements OnInit {
  @Input() contentTemp!: TemplateRef<any>;
  @Input() style: object = {};
  @Input() borderRound = true;
  @Input() position: string = 'center';
  @Input() closable: boolean = false;

  _isVisible = false;
  @Input() set isVisible(value: boolean) {
    if(this._isVisible !== value) {
      this._isVisible = value;
      this.isVisibleChange.emit(value);
    }
  }
  get isVisible(): boolean {
    return this._isVisible;
  }



  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  confirm1(event: Event) {

  }

  isMobile = false;
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 800; // Mobile breakpoint
  }
}
