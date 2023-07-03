import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from 'chai';
import {ConfigManager, endpoints} from '../../config';
import {User} from "../../support/components/user";
import supertest from "supertest";
import configManager from "../../config/lib/configManager";
import {Auth0} from "../../support/components/auth0";

setDefaultTimeout(120 * 1000);
let auth0: Auth0;

Given('The Stellare {string} is up and running', async function (country: string) {
    configManager.country = country;
    this.servers = {
        stellare: supertest(ConfigManager.config.baseURL.stellare),
        auth0: supertest(ConfigManager.config.baseURL.auth0),
        frankieOne: supertest(ConfigManager.config.baseURL.frankieOne),
        proviso: supertest(ConfigManager.config.baseURL.proviso)
    }
});

When('I sign up with email {string}', async function (email: string) {
    const timeStamp = Date.now();
    email = email.replace('@', `+${timeStamp}@`);
    auth0 = new Auth0(this.servers.auth0);
    this.userToken = await auth0.createUser(email);
    console.log('new user email ' + email)
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