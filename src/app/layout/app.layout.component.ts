import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MenuService } from './app.menu.service';
import { AppTopbarComponent } from './app.topbar.component';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    menuScrollListener: any;

    @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

    constructor(private menuService: MenuService, public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.appSidebar.el.nativeElement.isSameNode(event.target) || this.appTopbar.appSidebar.el.nativeElement.contains(event.target)
                    || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if ((this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isCompact()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appTopbar.appSidebar.menuContainer.nativeElement, 'scroll', event => {
                    if (this.layoutService.isDesktop()) {
                        this.hideMenu();
                    }
                });
            }


            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.unblockBodyScroll();
            });
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        this.menuService.reset();
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        if (this.menuScrollListener) {
            this.menuScrollListener();
            this.menuScrollListener = null;
        }
        this.unblockBodyScroll();
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'layout-compact': this.layoutService.config.menuMode === 'compact',
            'layout-reveal': this.layoutService.config.menuMode === 'reveal',
            'layout-drawer': this.layoutService.config.menuMode === 'drawer',
            'layout-sidebar-dim': this.layoutService.config.colorScheme === 'dim',
            'layout-sidebar-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive || this.layoutService.state.staticMenuMobileActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'p-ripple-disabled': !this.layoutService.config.ripple,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'layout-sidebar-active': this.layoutService.state.sidebarActive,
            'layout-sidebar-anchored': this.layoutService.state.anchored
        }
    }

    get sidebarClass() {
        return this.layoutService.config.colorScheme === 'light' ? `layout-sidebar-${this.layoutService.config.menuTheme}` : '';
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

}
