import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent {
    @Input() columns: any[] = [];
    @Input() data: any[] = [];
    @Input() selectedRow: any;
    @Output() selectedRowChange = new EventEmitter<any>();
    @Input() buttonTemplate!: TemplateRef<any>;
}
