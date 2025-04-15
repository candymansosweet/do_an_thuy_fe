import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageKeys } from 'src/app/shared/constants/storage-key';
import { AppConfigService } from 'src/app/shared/system-services/app-config.service';
import { AuthStateService } from 'src/app/shared/system-services/auth-state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;

            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    loading: boolean = false;
    constructor(
        public configService: AppConfigService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authState: AuthStateService,
        private authService: AuthService,
        private notification: NotificationService,
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    login() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.authService
                .login(this.loginForm.value)
                .subscribe({
                    next: (res) => {
                        console.log(res);
                        localStorage.setItem(StorageKeys.TOKEN, res.token);
                        localStorage.setItem(StorageKeys.USER, JSON.stringify(res));

                        this.authState.dispatch(res.jsonData);
                        let returnUrl = '';
                        if (this.route.snapshot.queryParams['returnUrl']) {
                            returnUrl = this.route.snapshot.queryParams['returnUrl'];
                        }
                        // if(returnUrl){
                            this.router.navigate(['/'], { replaceUrl: true });
                        // }
                        // else{
                        //     this.router.navigate(['/']);
                        // }
                    },

                    error: (err) => {
                        this.notification.error('Đã có lỗi hệ thống xảy ra. Xin vui lòng liên hệ Admin!', '');
                    },
                })
                .add(() => {
                    this.loading = false;
                });
        } else {
            Object.values(this.loginForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}
