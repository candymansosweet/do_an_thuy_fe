import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    constructor(public layoutService: LayoutService) { }

    get logo() {
        return this.layoutService.config.colorScheme === 'light' ? 'dark' : 'white';
    }

}
