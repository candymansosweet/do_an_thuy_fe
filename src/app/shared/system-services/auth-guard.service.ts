import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Subscription } from "rxjs";
import { IAuthModel, INIT_AUTH_MODEL } from "src/app/models/auth-model";
import { NotificationService } from "src/app/services/notification.service";
import { AuthStateService } from "./auth-state.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate, OnDestroy {
    protected _authSubscription: Subscription;
    currentUser = INIT_AUTH_MODEL;

    constructor(
      private router: Router,
      private notification: NotificationService,
      private authState: AuthStateService,
    ) {
      this._authSubscription = this.authState.subscribe( (m: IAuthModel) => {
        this.currentUser = m;
      });
    }

    public ngOnDestroy(): void {
      this._authSubscription.unsubscribe();
    }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
      if (route.data['role']) {
        if (this.currentUser.role === route.data['role']) {
          return true;
        }
      } else if (this.currentUser.userId) {
        return true;
      }
      else if (state.url.includes('share/')) {
        ////console.log('return here!!!');
        return true;
      }

      // this.notification.warn('Bạn không có quyền truy cập đường dẫn này', '');
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url} });
      return false;
    }
  }
