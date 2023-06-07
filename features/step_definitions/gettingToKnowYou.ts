import {Then, When} from "@cucumber/cucumber";
import {task} from "../../support/components/task";
import {User} from "../../support/components/user"
import {expect} from "chai";

When('I complete page username with name {string}', async function (name: string) {
    this.journeyId = await task.kickoffJourney(this.servers.stellare, this.userId, this.userToken);
    console.log('journey id: ' + this.journeyId);
    const taskInfo = await task.waitTaskActive(this.servers.stellare, this.userId, this.journeyId);
    this.currentTaskName = taskInfo.body.taskDefinitionId;
    this.currentTaskId = taskInfo.body.id;
    this.response = await User.saveUsername(this.servers.stellare, this.userToken, name);
})

Then('The user name saved successfully', async function () {
    expect(this.response.status).equal(200);
});