import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppConfigService } from './shared/system-services/app-config.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MessageService } from 'primeng/api';
import { NotificationService } from './services/notification.service';
import { NotificationModule } from './shared/components/notification/notification.module';
export function initAppConfig(appConfigService: AppConfigService) {
    return () => appConfigService.load();
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NotificationModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        AppConfigService,
        MessageService,
        NotificationService,

        {
            provide: APP_INITIALIZER,
            useFactory: initAppConfig,
            deps: [AppConfigService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
