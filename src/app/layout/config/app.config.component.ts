import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../app.menu.service';
import { ColorScheme, LayoutService, MenuMode } from '../service/app.layout.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    @Input() minimal: boolean = false;

    componentThemes: any[] = [];
    
    menuThemes: any[] = [];

    scales: number[] = [12,13,14,15,16];

    constructor(public layoutService: LayoutService, public menuService: MenuService) { }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): MenuMode {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: MenuMode) {
        this.layoutService.config.menuMode = _val;
        if (this.layoutService.isSlim() || this.layoutService.isHorizontal() || this.layoutService.isCompact()) {
            this.menuService.reset();
        }
    }

    get colorScheme(): ColorScheme {
        return this.layoutService.config.colorScheme;
    }

    set colorScheme(_val: ColorScheme) {
        this.changeColorScheme(_val);
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    get menuTheme(): string {
        return this.layoutService.config.menuTheme;
    }

    set menuTheme(_val: string) {
        this.layoutService.config.menuTheme = _val;
    }

    ngOnInit() {

        this.componentThemes = [
            {name: 'blue', color: '#2196F3'},
            {name: 'green', color: '#4CAF50'},
            {name: 'lightgreen', color: '#8BC34A'},
            {name: 'purple', color: '#9C27B0'},
            {name: 'deeppurple', color: '#673AB7'},
            {name: 'indigo', color: '#3F51B5'},
            {name: 'orange', color: '#FF9800'},
            {name: 'cyan', color: '#00BCD4'},
            {name: 'pink', color: '#E91E63'},
            {name: 'teal', color: '#009688'}
        ];

        this.menuThemes = [
            {name: 'white', color: '#ffffff', logoColor: 'dark', componentTheme: null},
            {name: 'darkgray', color: '#343a40', logoColor: 'white', componentTheme: null},
            {name: 'blue', color: '#2196F3', logoColor: 'white', componentTheme: 'blue'},
            {name: 'bluegray', color: '#455a64', logoColor: 'white', componentTheme: 'lightgreen'},
            {name: 'brown', color: '#5d4037', logoColor: 'white', componentTheme: 'cyan'},
            {name: 'cyan', color: '#00BCD4', logoColor: 'white', componentTheme: 'cyan'},
            {name: 'green', color: '#4CAF50', logoColor: 'white', componentTheme: 'green'},
            {name: 'indigo', color: '#3F51B5', logoColor: 'white', componentTheme: 'indigo'},
            {name: 'deeppurple', color: '#673AB7', logoColor: 'white', componentTheme: 'deeppurple'},
            {name: 'orange', color: '#FF9800', logoColor: 'dark', componentTheme: 'orange'},
            {name: 'pink', color: '#E91E63', logoColor: 'white', componentTheme: 'pink'},
            {name: 'purple', color: '#9C27B0', logoColor: 'white', componentTheme: 'purple'},
            {name: 'teal', color: '#009688', logoColor: 'white', componentTheme: 'teal'},
        ];
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeColorScheme(colorScheme: ColorScheme) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href');
        const currentColorScheme = 'theme-' + this.layoutService.config.colorScheme;
        const newColorScheme = 'theme-' + colorScheme;
        const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);

        this.replaceThemeLink(newHref, 'theme-link', () => {
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    changeComponentTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);

        this.replaceThemeLink(newHref, 'theme-link', () => {
            this.layoutService.config.theme = theme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, targetId: string, onComplete?: Function) {
        const id = targetId;
        const targetLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>targetLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        targetLink.parentNode!.insertBefore(cloneLinkElement, targetLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            targetLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete && onComplete();
        });
    }

    changeMenuTheme(theme: any) {
        this.layoutService.config.menuTheme = theme.name;
        this.layoutService.onConfigUpdate();
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
    
}
