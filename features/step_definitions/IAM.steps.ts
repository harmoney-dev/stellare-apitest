import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from 'chai';
import {baseURL, endpoints} from '../../config';
import supertest from "supertest";
import {User} from "../../support/components/user";

Given('The IAM is up and running', async function () {
    const response = await User.iamAdmin(this.servers.iam);
    this.adminToken = response.body.access_token;
});

When('I sign up with email {string}', async function (email: string) {
    const timeStamp = Date.now();
    email = email.replace('@', `+${timeStamp}@`);
    await User.createUser(this.servers.iam, email, this.adminToken);
    console.log('new user email ' + email)
    this.userToken = await User.getUserToken(this.servers.iam, email)
    this.email = email;
});

Then('user sign up success', async function () {
    const res = await User.postUser(this.servers.stellare, this.userToken)
    expect(res.body.id).not.equal('');
    this.userId = res.body.id;
    console.log('userId ' + this.userId)
    expect(res.body.email).equal(this.email);
});

