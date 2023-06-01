import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    accessToken: string;
    refreshToken: string;
    statusCode: number;

    constructor() {
        this.accessToken = "";
        this.refreshToken = "";
        this.statusCode = 0;
    }
    
}

setWorldConstructor(CustomWorld);
