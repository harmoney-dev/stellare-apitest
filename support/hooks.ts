import {baseURL, routeMap} from "../config";
import supertest from "supertest";
import {AfterStep, Before, setDefaultTimeout} from "@cucumber/cucumber";
import {task} from "./components/task";
import {expect} from "chai";
import {helper} from "../utils/helper";


Before(function (testCase) {
    setDefaultTimeout(60000);
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
        const currentTask = await task.getCurrentTask(this.servers.stellare, this.userId, this.journeyId);
        const searchKey = matchResult[1];
        if (searchKey.toLowerCase() in routeMap) {
            const taskName = routeMap[searchKey.toLowerCase()];
            expect(taskName).equal(currentTask.body.taskDefinitionId);
            let variable = '{}';
            if (taskName == 'user-task-identity-information') {
                variable = `{"variables":"{"verificationStatus":"success","applicationStatus":null}"}`;
            }
            await task.completeTask(this.servers.stellare, currentTask.body.id, this.userToken, variable);
            await helper.delay(1000);
            const res = await task.waitTaskActive(this.servers.stellare, this.userId, this.journeyId);
            console.log(res.body)
        }
    }
});