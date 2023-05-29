import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from 'chai';
import {endpoints} from '../../config';
import {ICustomWorld} from "../../support/custom-world";

Given('the home page is ready', async function (this: ICustomWorld) {
    const userTokenBody = {
        grant_type: 'password',
        username: 'terry.feng+test1@harmoney.co.nz',
        password: 'Harmoney123@'
    }
    this.response = await this.server.iam.post(endpoints.iam.userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic c3RlbGxhcmUtbno6')
        .send(userTokenBody)
});

When('I get user with token', async function (this: ICustomWorld) {
    const token = this.response.body.access_token;
    this.response = await this.server.stellare.get(endpoints.stellare.users).set('Authorization', 'Bearer ' + token)
});

Then('user sign up success', async function (this: ICustomWorld) {
    expect(this.response.status).to.equal(200);
});

