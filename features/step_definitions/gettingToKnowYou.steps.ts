import {DataTable, Then, When} from "@cucumber/cucumber";
import {Task} from "../../support/components/task";
import {User} from "../../support/components/user"
import {expect} from "chai";
import {faker} from "@faker-js/faker";
import {LoanProduct} from "../../support/components/loanProduct";
import {Helper} from "../../utils/helper";
import {loanPurpose} from "../../config";
import {LoanApplication} from "../../support/components/loanApplication";
import {ResidencyStatus} from "../../config";
import Environment from "../../config/environment/environment";

let task: Task;
let user: User;
let loanProduct: LoanProduct;
let loanApplication: LoanApplication;

When('I complete user task username with name {string}', async function (name: string) {
    task = new Task(this!.servers.stellare, this!.userToken);
    user = new User(this!.servers.stellare, this!.userToken);
    const journey = await task.kickoffJourney(this.userId);
    this.journeyId = journey.journeyId;
    this.productId = journey.productId;
    const taskInfo = await task.waitTaskActive(this.userId, this.journeyId);
    this.currentTaskName = taskInfo.body.taskDefinitionId;
    this.currentTaskId = taskInfo.body.id;
    this.response = await user.saveUsername(name == 'faker' ? faker.person.firstName() : name);
});

When('I complete user task loan-amount with following details', async function(dataTable: DataTable) {
    const loanData = dataTable.hashes()[0];
    const amount = loanData['amount'];
    let residencyStatus = loanData['residencyStatus'];
    if (residencyStatus.toLowerCase() === 'no') {
        residencyStatus = ResidencyStatus.NONE_CITIZEN_OR_PERMANENT_RESIDENT;
    } else {
        residencyStatus = Environment.isAU ? ResidencyStatus.AU_CITIZEN_OR_PERMANENT_RESIDENT : ResidencyStatus.NZ_CITIZEN_OR_PERMANENT_RESIDENT;
    }
    const taskVariables = await task.getTaskVariable(this.currentTaskId);
    this.applicationId = taskVariables.body.loanApplicationId;
    const body = { id: this.applicationId, amount:parseInt(amount), residencyStatus:residencyStatus };
    this.response = await user.saveLoanAmount(body);
});

When('I submit user task loan-purpose with purpose {string}', async function(purpose: string) {
    loanProduct = new LoanProduct(this!.servers.stellare, this!.userToken);
    loanApplication = new LoanApplication(this!.servers.stellare, this!.userToken);
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
    this.response = await loanApplication.submitLoanPurpose(this.applicationId, body);
});

Then('The task completed successfully', async function () {
    expect(this.response.status).to.be.oneOf([200, 201]);
    if (this.response.body.success) {
        expect(this.response.body.success).equal(true);
    }
});