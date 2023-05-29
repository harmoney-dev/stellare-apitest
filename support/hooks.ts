import {baseURL} from "../config";
import supertest from "supertest";
import {After, Before, BeforeAll, ITestCaseHookParameter} from "@cucumber/cucumber";
import {ICustomWorld} from "./custom-world";

const server = {
    iam: supertest(baseURL.iam),
    stellare: supertest(baseURL.stellare),
    frankieOne: supertest(baseURL.frankieOne),
    proviso: supertest(baseURL.proviso)
}
BeforeAll(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    this.startTime = new Date();
    this.testName = pickle.name.replace(/\W/g, '-');
    this.server = server;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
    const test = this.feature?.name
    console.log(`test result of scenario ${test} is ${result}`);
})