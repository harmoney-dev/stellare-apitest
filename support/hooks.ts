import {baseURL, routeMap} from "../config";
import supertest from "supertest";
import {AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout} from "@cucumber/cucumber";
import {task} from "./components/task";
import {expect} from "chai";
import {helper} from "../utils/helper";

BeforeAll(function () {
    setDefaultTimeout(60 * 1000);
})

Before(function (testCase) {
    this.servers = {
        stellare: supertest(baseURL.stellare),
        iam: supertest(baseURL.iam),
        frankieOne: supertest(baseURL.frankieOne),
        proviso: supertest(baseURL.proviso)
    }
    this.feature = testCase.pickle.name;
    console.log('log info from scenario: ' + this.feature);
});

AfterStep(async function (testCase) {
    const stepName = testCase.pickleStep.text
    const regexPattern = /(page\s+[\w-]+)/i; // Regular expression pattern
    const matchResult = stepName.match(regexPattern);
    if (matchResult && matchResult[1]) {
        const searchKey = matchResult[1];
        if (searchKey.toLowerCase() in routeMap) {
            const taskName = routeMap[searchKey.toLowerCase()];
            expect(taskName).equal(this.currentTaskName);
            let variable = '{}';
            if (taskName == 'user-task-identity-information') {
                variable = `{"variables":"{"verificationStatus":"success","applicationStatus":null}"}`;
            }
            await task.completeTask(this.servers.stellare, this.currentTaskId, this.userToken, variable);
            await helper.delay(1000);
            const taskInfo = await task.waitTaskActive(this.servers.stellare, this.userId, this.journeyId);
            this.currentTaskName = taskInfo.body.taskDefinitionId;
            this.currentTaskId = taskInfo.body.id;
        }
    }
});