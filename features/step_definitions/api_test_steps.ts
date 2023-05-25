import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('');

Given('I am a user', function () {
  // No action needed for this step
});

When('I send a GET request to {string}', async function (url: string) {
  this.response = await request.get(url);
});

Then('I should receive a {int} status code', function (statusCode: number) {
  expect(this.response.status).to.equal(statusCode);
});
