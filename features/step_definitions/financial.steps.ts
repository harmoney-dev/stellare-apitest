import {DataTable, Then, When} from "@cucumber/cucumber";
import {Income} from "../../support/payloads/income";
import {Financial} from "../../support/components/financial";
import {Expense} from "../../support/payloads/expense";
import {User} from "../../support/components/user";
import {Helper} from "../../utils/helper";
import {Asset} from "../../support/payloads/asset";
import {Debt} from "../../support/payloads/debt";
import {Task} from "../../support/components/task";

let user: User;
let financial: Financial;
let proviso: Financial;

When('I submit the user income with income details', async function (table: DataTable) {
    const body = Income.getIncomesWithChangeStatus(this.currentTaskId, table);
    this.response = await financial.submitIncome(body);
})

When('I submit the living expense with expense details', async function (table: DataTable) {
    const expenses = Expense.getExpensesWithChangeStatus(this.currentTaskId, table);
    this.response = await financial.submitExpense(expenses);
})

When('I submit the user household with following details', async function (table: DataTable) {


    user = new User(this!.servers.stellare, this!.userToken);
    //Update dependent in user profile
    const dependants = table.hashes()[0]['dependants'];
    const relationshipStatus = table.hashes()[0]['relationshipStatus'];
    let userProfileData;
    try {
        userProfileData = (await user.getUserProfile('customer')).body;
    } catch (e) {
        //wait for user profile updated in slow network
        await Helper.delay(5000);
    }
    if (userProfileData == null)
        userProfileData = (await user.getUserProfile('customer')).body;
    userProfileData.numberOfDependants = parseInt(dependants);
    userProfileData.relationshipStatus = relationshipStatus.toUpperCase();
    userProfileData.name = {
        givenName: userProfileData.firstName,
        familyName: userProfileData.lastName,
        middleName: userProfileData.middleName
    };
    await user.updateUserProfile(this.userId, userProfileData);

    //update residential status in user address
    const addressData = userProfileData.addresses.find((item: any) => item.isCurrent === true);
    addressData.residentialStatus = table.hashes()[0]['residentialStatus'];
    await user.updateUserAddress(addressData);

    //submit expense
    //First node in financial process
    financial = new Financial(this.servers.stellare, this.userToken);
    const body = Expense.getExpensePayload(this.currentTaskId, table);
    this.response = await financial.submitExpense(body);

    //update income if receive child support
    const incomeChildSupport = table.hashes()[0]['income child support'];
    if (incomeChildSupport) {
        const patchIncome = new DataTable([
            ['income child support'],
            [incomeChildSupport],
        ]);
        this.response = await financial.submitIncome(Income.getIncomes(this.currentTaskId, patchIncome))
    }
})

When('I submit the Proviso with following bank details', async function (table: DataTable) {
    const bankData = table.hashes()[0];
    const bank = bankData['bank'].replaceAll(' ', '_')
    const provisoConfig = await financial.getProvisoConfig(this.userId, this.applicationId);
    const appRef = provisoConfig.body.appReference;
    const linkSplit = provisoConfig.body.url.split('/');
    const linkToken = linkSplit[linkSplit.length - 1];
    proviso = new Financial(this.servers.proviso, linkToken);
    await proviso.initProviso();
    await proviso.selectBank(bank);
    const body = {
        _token: '',
        username: bankData['username'],
        password: bankData['password'],
        institution: bank,
        terms: 'terms'
    };
    await proviso.submitBankDetails(body);
    this.response = await financial.updateProvisoStatus(appRef, {status: 'COMPLETE'});
})

When('I wait for user task load-bank-statement to complete', async function () {
    await Helper.delay(5000);
})

When('I submit the asset with following details', async function (table: DataTable) {
    const body = Asset.getAssets(this.currentTaskId, table);
    this.response = await financial.submitAssets(body);
})

When('I submit the user debts with following details', async function (table: DataTable) {
    const body = Debt.getDebts(this.currentTaskId, table);
    this.response = await financial.submitLiabilities(body);
})

When('I submit the user task financial-summary', async function () {

})

Then('I can check the application status', async function () {
    const task = new Task(this.servers.stellare, this.userToken);
    this.response = await task.getTaskVariable(this.currentTaskId);
    const declineMetric = this.response.body.declineCheckResult;
    let accountStatus: any = [];
    for (const item of declineMetric) {
        if (item.applicationStatus === 'quote_unsuccessful' ||
        item.applicationStatus.toLowerCase().includes('failed') ) {
            accountStatus.push(item);
        }
    }
    if (accountStatus.length != 0) {
        console.log('Application status:\n', accountStatus);
    }
})
