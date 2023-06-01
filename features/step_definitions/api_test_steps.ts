import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';

const s2Request = supertest('https://harmonize.harmoneylabs.com');


When('I create a new user', async function() {
    const response = await s2Request
        .post('/api/users')
        .set('Authorization', `Bearer ${this.accessToken}`)
        .send({});

    this.statusCode = response.status;
});

When('I update the preferred name of the user', async function() {
    const response = await s2Request
        .patch('/api/users')
        .set('Authorization', `Bearer ${this.accessToken}`)
        .send({
            preferredName: "Shawn",
        });

    this.statusCode = response.status;
});
