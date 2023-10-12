import {Then, When} from "@cucumber/cucumber";
import {Task} from "../../support/components/task";
import {User} from "../../support/components/user"
import {expect} from "chai";
import {faker} from "@faker-js/faker";
import {LoanProduct} from "../../support/components/loanProduct";
import {Helper} from "../../utils/helper";
import {loanPurpose} from "../../config";
import {LoanApplication} from "../../support/components/loanApplication";
import {singleRelationshipStatus} from "../../config/lib/relationshipStatus.enum"

let task: Task;
let user: User;
let loanProduct: LoanProduct;
let loanApplication: LoanApplication;

When('I submit username with name {string}', async function (name: string) {
    task = new Task(this!.servers.stellare, this!.userToken);

    const journey = await task.kickoffJourney(this.userId);
    this.journeyId = journey.journeyId;
    this.productId = journey.productId;
    const taskInfo = await task.waitTaskActive(this.userId, this.journeyId, this.currentTaskName);
    this.currentTaskName = taskInfo?.body.taskDefinitionId;
    this.currentTaskId = taskInfo?.body.id;

    user = new User(this!.servers.stellare, this!.userToken);
    this.response = await user.saveUsername(name == 'faker' ? faker.person.firstName() : name);
});

Then('I get the loan application ID',async function(){
    //Get the application id from the current task
    const taskVariables = await task.getTaskVariable(this.currentTaskId);
    this.applicationId = taskVariables.body.loanApplicationId;
});

When('I submit loan amount as much as {string}', async function(amount: string) {
    const loanAmount = Math.floor(Math.random() * (Number(amount) - 2000 + 1)) + 2000;
    const body = { id: this.applicationId, requestedAmount: loanAmount};
    this.response = await user.saveLoanAmount(body);

    await user.verifyEmail(this.email);
});

When('I submit residency status with status {string}', async function(status: string) {
    const body = { id: this.applicationId, residencyStatus: status };
    this.response = await loanApplication.submitLoanApplication(body);
});

When('I submit relationship status with status {string}', async function(status: string) {
    status = status === 'random' ? Helper.getRandomEnumValue(singleRelationshipStatus) : status;
    const body = {relationshipStatus: status };
    this.response = await user.updateUserProfile(this.userId, body);
});

When('I submit loan purpose with purpose {string}', async function(purpose: string) {
    loanProduct = new LoanProduct(this!.servers.stellare, this!.userToken);
    loanApplication = new LoanApplication(this!.servers.stellare, this!.userToken, this.applicationId);
    if (purpose === '' || purpose.toLowerCase() === 'random') {
        purpose = loanPurpose[Math.floor(Math.random() * loanPurpose.length)];
    }
    const loanPurposeList = await loanProduct.getLoanPurposeList(this.productId);
    const purposeDetail = loanPurposeList.body.find((item: {[key: string]: string}) => Helper.equalsIgnoreCase(item.displayName, purpose));
    let body: any = [];
    let answers: Array<{[key: string]: string}> = [];
    if ('medical, education'.includes(purpose.toLowerCase())) {
        for (const question of purposeDetail.questions) {
            const option = question.options.find((opt: {[key: string]: string}) => opt.name === 'no');
            if (option) {
                answers = [{questionId: question.id, optionId: option.id}];
                break;
            }
        }
    }
    body = [{id: purposeDetail.id, answers: answers}];
    this.response = await loanApplication.submitLoanPurpose(body);
});

When('I submit the mobile number with number {string}', async function(mobileNumber: string) {
    if (isNaN(Number(mobileNumber))) {
        mobileNumber = '+' + Date.now();
    }
    this.response = await user.saveMobileNumber(mobileNumber);
});

Then('The user task {string} completed successfully', async function (taskName: string) {
    expect(this.response.status).to.be.oneOf([200, 201]);
    if (this.response.body.success) {
        expect(this.response.body.success).equal(true);
    }
});