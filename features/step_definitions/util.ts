import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';

// Storing the statusCode in the World instance to make it accessible across step definitions
Then('I should receive a status code of {int}', function(expectedStatusCode) {
    expect(this.statusCode).to.equal(expectedStatusCode);
});