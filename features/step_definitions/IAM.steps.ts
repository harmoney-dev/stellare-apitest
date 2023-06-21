import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from 'chai';
import {ConfigManager, endpoints} from '../../config';
import {User} from "../../support/components/user";
import supertest from "supertest";
import configManager from "../../config/lib/configManager";
import { IAM } from "../../support/components/iam";

setDefaultTimeout(60 * 1000);
let iam: IAM;

Given('The Stellare {string} is up and running', async function (country: string) {
   configManager.country = country;
    this.servers = {
        stellare: supertest(ConfigManager.config.baseURL.stellare),
        iam: supertest(ConfigManager.config.baseURL.iam),
        frankieOne: supertest(ConfigManager.config.baseURL.frankieOne),
        proviso: supertest(ConfigManager.config.baseURL.proviso)
    }
    iam = new IAM(this.servers.iam);
    const response = await iam.iamAdmin();
    this.adminToken = response.body.access_token;
    iam.adminToken = this.adminToken;
});

When('I sign up with email {string}', async function (email: string) {
    const timeStamp = Date.now();
    email = email.replace('@', `+${timeStamp}@`);
    await iam.createUser(email);
    console.log('new user email ' + email)
    this.userToken = await iam.getUserToken(email);
    this.email = email;
});

Then('user sign up success', async function () {
    const user = new User(this.servers.stellare, this.userToken);
    const res = await user.postUser(endpoints.stellare.users);
    expect(res.body.id).not.equal('');
    this.userId = res.body.id;
    console.log('userId ' + this.userId)
    expect(res.body.email).equal(this.email);
});

