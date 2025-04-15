import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../shared/system-services/auth-state.service';
import { StorageKeys } from '../shared/constants/storage-key';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    accountName: any = '';
    constructor(
        public layoutService: LayoutService,
        public el: ElementRef,
        // private authService: AuthService,
        private authState: AuthStateService,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.authState.subscribe((data) => {
            this.accountName = data?.accountName;
        });
    }


    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showRightMenu();
    }

    onSearchClick() {
        this.layoutService.toggleSearchBar();
    }

    onRightMenuClick() {
        this.layoutService.showRightMenu();
    }

    get logo() {
        const logo = this.layoutService.config.menuTheme === 'white' || this.layoutService.config.menuTheme === 'orange' ? 'dark' : 'white';
        return logo;
    }
    signOut() {
        localStorage.removeItem(StorageKeys.TOKEN);
        localStorage.removeItem(StorageKeys.USER);
        this.authState.dispatch(null);
        this.router.navigate(['auth/login']);
    }

}
