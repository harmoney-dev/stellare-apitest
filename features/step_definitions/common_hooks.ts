import { Before } from '@cucumber/cucumber';
import supertest from 'supertest';

const iamRequest = supertest('https://identity.harmoneylabs.com');

let accessToken: string;
let refreshToken: string;

Before(async function() {
    const response = await iamRequest
        .post('/realms/customer/protocol/openid-connect/token')
        .type('form')
        .send({
            grant_type: "password",
            client_id: "stellare-au",
            username: "loadtesting@harmoney.co.nz",
            password: "Harmoney123!",
        });

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;

    // Storing the tokens in the World instance to make it accessible across step definitions
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
});
