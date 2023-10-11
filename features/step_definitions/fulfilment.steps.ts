import {Then, When} from "@cucumber/cucumber";
import {LoanApplication} from "../../support/components/loanApplication";
import {LoanDetails} from "../../support/payloads/loanDetails";
import {expect} from "chai";
import {Helper} from "../../utils/helper";

let loanApplication: LoanApplication;

When('I submit user task loan-quote with loan amount {string} and term {string}', async function (loanAmount: number, term: number) {
    loanApplication = new LoanApplication(this!.servers.stellare, this!.userToken, this.applicationId);
    const quote = await loanApplication.getLoanQuote();
    if (isNaN(loanAmount) || loanAmount > quote.body.maximumBorrowingLimit)
        loanAmount = quote.body.maximumBorrowingLimit;
    const loanPayload = LoanDetails.getLoanApplicationPayload(this.applicationId, loanAmount, term);
    await loanApplication.submitLoanApplication(loanPayload);
});

When('I choose repayment frequency {string} and the next {string} days as the start date', async function (fre: string, offset: number) {
    const repaymentPayload = LoanDetails.getRepaymentDetailsPayload(this.applicationId, this.response.body, fre, offset);
    await loanApplication.submitRepaymentDetails(repaymentPayload);
    await loanApplication.acceptLoanAgreement();
    this.response = await loanApplication.acceptLoanDisclosure();
});

When('I check the email verify status', async function () {
    await loanApplication.checkEmailVerifyStatus();
});

Then('I can get the repayment details', async function () {
    this.response = await loanApplication.getRepaymentDetails();
});

async function checkApplicationStatus(applicationDetails: any) {
    let instanceComplete = true;
    let transactionComplete = true;

    for (const instance of applicationDetails.instances) {
        if (instance.state !== 'completed') {
            instanceComplete = false;
            break;
        }
    }

    for (const transaction of applicationDetails.transactions) {
        if (transaction.status !== 'success') {
            transactionComplete = false;
            break;
        }
    }
    return instanceComplete && transactionComplete;
}
Then('I can do the final check on application status', async function () {
    let applicationDetails = (await loanApplication.getApplicationStatus(this.email)).body;
    let applicationComplete = await checkApplicationStatus(applicationDetails);
    let index = 0;
    while (!applicationComplete && index < 10) {
        await Helper.delay(3000);
        index++;
        applicationDetails = (await loanApplication.getApplicationStatus(this.email)).body;
        applicationComplete = await checkApplicationStatus(applicationDetails);
    }

    expect(applicationDetails.creditCheckStatus.toLowerCase()).to.equal('passed');
    expect(applicationDetails.scorecardStatus.toLowerCase()).to.equal('passed');
    expect(applicationDetails.hardPullCreditCheckStatus.toLowerCase()).to.equal('passed');
    expect(applicationDetails.status.toLowerCase()).to.equal('application - successful');
    expect(applicationDetails.fraudCheckStatus.toLowerCase()).to.equal('successful');
    expect(applicationDetails.riskCheckStatus.toLowerCase()).to.equal('successful');

    applicationDetails.transactions.forEach((transaction: any) => {
        expect(transaction.status.toLowerCase()).to.equal('success');
    });

    applicationDetails.instances.forEach((instance: any) => {
        expect(instance.state.toLowerCase()).to.equal('completed');
    });
});

