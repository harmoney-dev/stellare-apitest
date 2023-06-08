import {setWorldConstructor} from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import {Pickle} from "@cucumber/messages";

class CustomWorld {
    accessToken: string;
    refreshToken: string;
    statusCode: number;
    adminToken: string;
    userToken: string;
    userId: string;
    journeyId: string;
    taskId: string;
    applicationId: string;
    servers: {[key: string]: string}
    feature: messages.Pickle;
    currentTaskName: string;
    currentTaskId: string;

    constructor() {
        this.accessToken = "";
        this.refreshToken = "";
        this.statusCode = 0;
        this.adminToken = '';
        this.userToken = '';
        this.userId = '';
        this.journeyId = '';
        this.taskId = '';
        this.applicationId = '';
        this.servers = {};
        this.feature = new Pickle();
        this.currentTaskName = '';
        this.currentTaskId = '';
    }
}

setWorldConstructor(CustomWorld);