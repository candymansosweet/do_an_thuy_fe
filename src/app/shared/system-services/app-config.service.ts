import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
    private config = new AppConfig();
    private options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            DataType: 'application/json',
        },
    };

    constructor(
        private http: HttpClient
    ) {}
    load() {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `../../assets/config/${environment.env}.json`,
                    this.options
                )
                .subscribe({
                    next: (data: any) => {
                        this.setConfig(data);
                        resolve(true);
                    },
                    error: (error) => {
                        reject(error.message || 'Server Error');
                    },
                });
        });
    }
    private setConfig = (data: any): void => {
        //common level 0 props
        Object.assign(this.config, data);

        //other deeper props
        this.config.api.baseUrl = data.api.baseUrl;
        this.config.domain = data.domain;

        this.config.supabase.url = data.supabaseConfig.url;
        this.config.supabase.key = data.supabaseConfig.key;
    };

    getConfig = () => this.config;
}
