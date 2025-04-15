import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { NotificationService } from "src/app/services/notification.service";
import { AppConfigService } from "../system-services/app-config.service";
import { StorageKeys } from "../constants/storage-key";
import { environment } from "src/environments/environment";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    baseUrl = '';
    baseDeepZoomUrl = '';
    unauthorizedUrls = ['/SystemConfig', '/UserSettings', '/Label',];
    constructor(
        private notification: NotificationService,
        private router: Router,
        public configService: AppConfigService,
    ) {
        this.baseUrl = this.configService.getConfig().api.baseUrl;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const token = localStorage.getItem(StorageKeys.TOKEN)
        const isApiUrl = request.url.includes(this.baseUrl);
        const isDeepZoomApiUrl = request.url.includes(this.baseDeepZoomUrl);
        const currentUrl = this.router.url;
        const isShareUrl = currentUrl.includes('/share/');
        if (token && (isApiUrl || isDeepZoomApiUrl)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return next.handle(request).pipe(
            map((res: HttpEvent<any>) => {
                if (res instanceof HttpResponse && !environment.production) {
                    if (res.body.isValid === false && res.body.errors[0]) {
                    }
                }
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !this.unauthorizedUrls.some(url => request.url.includes(url)) && !isShareUrl) {
                    this.notification.error('Phiên đăng nhập hết hạn', '');
                    localStorage.removeItem(StorageKeys.TOKEN);
                    localStorage.removeItem(StorageKeys.USER);
                    this.router.navigate(['auth/login']);
                }
                else if (!environment.production) {
                    //   this.notification.error('DEV: Có lỗi xảy ra! Error: ' + error.status, request.url);
                }
                return throwError(() => error);
            }));
    }
}