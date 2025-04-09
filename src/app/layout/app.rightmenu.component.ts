import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './app.rightmenu.component.html'
})
export class AppRightMenuComponent {

    selectedAmount!: SelectItem;

    amount = [
        {label: '*****24', value: {id: 1, name: '*****24', code: 'A1'}},
        {label: '*****75', value: {id: 2, name: '*****75', code: 'A2'}}
    ];

    constructor(public layoutService: LayoutService) { }

    get visible(): boolean {
        return this.layoutService.state.rightMenuVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.rightMenuVisible = _val;
    }

}