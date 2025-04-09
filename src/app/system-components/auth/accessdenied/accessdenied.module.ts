import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessdeniedRoutingModule } from './accessdenied-routing.module';
import { AccessdeniedComponent } from './accessdenied.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        AccessdeniedComponent
    ],
    imports: [
        CommonModule,
        AccessdeniedRoutingModule,
        ButtonModule
    ]
})
export class AccessdeniedModule { }
