import { Component } from '@angular/core';

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
export class LoginComponent { }
