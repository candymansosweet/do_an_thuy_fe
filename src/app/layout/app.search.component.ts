import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-search',
    templateUrl: './app.search.component.html',
    styles: [`
        :host ::ng-deep {
            .p-dialog {
                .p-dialog-header {
                    display: none;
                }

                .p-dialog-content {
                    padding: 0;
                    background: transparent;
                }
            }

        }
    `]
})
export class AppSearchComponent {

    outsideClickListener: any;

    timeout!: any;

    constructor(private layoutService: LayoutService) {}

    @ViewChild('input') inputElement!: ElementRef;


    onInputKeydown(event: KeyboardEvent) {
        const key = event.which;

        // escape, tab and enter
        if (key === 27 || key === 9 || key === 13) {
            this.layoutService.state.searchBarActive = false;
        }
    }

    focusOnInput() {
        this.timeout = setTimeout(() => this.inputElement.nativeElement.focus(), 1);
    }

    get visible(): boolean {
        return this.layoutService.state.searchBarActive;
    }

    set visible(_val: boolean) {
        this.layoutService.state.searchBarActive = _val;
    }

}
