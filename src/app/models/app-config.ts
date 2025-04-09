export class AppConfig {
    api: {
        baseUrl: string,
    };
    supabase: {
        key: string,
        url: string,
    };
    domain: string;

    constructor() {
        this.api = {
            baseUrl: '',
        };
        this.domain = '';

        this.supabase = {
            key: '',
            url: '',
        };
    }
}