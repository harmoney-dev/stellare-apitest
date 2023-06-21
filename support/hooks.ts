import {routeMap} from "../config";
import {AfterStep, Before, BeforeStep} from "@cucumber/cucumber";
import {Task} from "./components/task";
import {expect} from "chai";
import {Helper} from "../utils/helper";

Before(function (testCase) {
    this.feature = testCase.pickle.name;
    console.log('log info from scenario: ' + this.feature);
});

AfterStep(async function (testCase) {
    const task = new Task(this.servers.stellare, this.userToken);
    const stepName = testCase.pickleStep.text
    const regexPattern = /(user task\s+[\w-]+)/i; // Regular expression pattern
    const matchResult = stepName.match(regexPattern);
    if (matchResult && matchResult[1]) {
        const searchKey = matchResult[1];
        if (searchKey.toLowerCase() in routeMap) {
            const taskName = routeMap[searchKey.toLowerCase()];
            expect(taskName).equal(this.currentTaskName);
            let variable = {"variables":"{}"};
            if (taskName == 'user-task-identity-information') {
                variable = {"variables":"{\"verificationStatus\":\"success\",\"applicationStatus\":null}"};
            }
            await task.completeTask(this.currentTaskId, this.userToken, variable);
            await Helper.delay(1000);
            const taskInfo = await task.waitTaskActive(this.userId, this.journeyId);
            this.currentTaskName = taskInfo.body.taskDefinitionId;
            this.currentTaskId = taskInfo.body.id;
        }
    }
});