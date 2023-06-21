import {DataTable, When} from "@cucumber/cucumber";
import {Income} from "../../support/payloads/income";
import {Financial} from "../../support/components/financial";
import {Expense} from "../../support/payloads/expense";
import {User} from "../../support/components/user";
import {Helper} from "../../utils/helper";
import {Asset} from "../../support/payloads/asset";
import {Debt} from "../../support/payloads/debt";

let user: User;
let financial: Financial;
let proviso: Financial;

When('I submit the user task income with income details', async function (table: DataTable) {
    financial = new Financial(this.servers.stellare, this.userToken);
    const body = Income.getIncomesWithChangeStatus(this.currentTaskId, table);
    this.response = await financial.submitIncome(body);
})

When('I submit the user task living-expense with expense details', async function (table: DataTable) {
    const expenses = Expense.getExpensesWithChangeStatus(this.currentTaskId, table);
    this.response = await financial.submitExpense(expenses);
})

When('I submit the user task household with following details', async function (table: DataTable) {
    user = new User(this!.servers.stellare, this!.userToken);
    //Update dependent in user profile
    const dependants = table.hashes()[0]['dependants'];
    const userProfileData = (await user.getUserProfile(this.userId)).body;
    userProfileData.numberOfDependants = parseInt(dependants);
    userProfileData.name = {givenName: userProfileData.firstName, familyName: userProfileData.lastName, middleName: userProfileData.middleName};
    await user.updateUserProfile(this.userId, userProfileData);

    //update residential status in user address
    const addressData = userProfileData.addresses.find((item: any) => item.isCurrent === true);
    addressData.residentialStatus = table.hashes()[0]['residentialStatus'];
    await user.updateUserAddress(addressData);

    //submit expense
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

When('I submit the user task connect-bank with following bank details', async function (table: DataTable) {
    const bankData = table.hashes()[0];
    const bank = bankData['bank'].replaceAll(' ', '_')
    const provisoConfig = await financial.getProvisoConfig(this.userId, this.applicationId);
    const appRef = provisoConfig.body.appReference;
    const linkSplit = provisoConfig.body.url.split('/');
    const linkToken = linkSplit[linkSplit.length -1];
    proviso = new Financial(this.servers.proviso, linkToken);
    await proviso.initProviso();
    await proviso.selectBank(bank);
    const body = {_token: '', username: bankData['username'], password: bankData['password'], institution: bank, terms: 'terms'};
    await proviso.submitBankDetails(body);
    this.response = await financial.updateProvisoStatus(appRef, {status: 'COMPLETE'});
})

When('wait for user task load-bank-statement to complete', async function (){
    await Helper.delay(5000);
})

When('I submit the user task asset with asset details', async function (table: DataTable) {
    const body = Asset.getAssets(this.currentTaskId, table);
    this.response = await financial.submitAssets(body);
})

When('I submit the user task debt with following details', async function (table: DataTable) {
    const body = Debt.getDebts(this.currentTaskId, table);
    this.response = await financial.submitLiabilities(body);
})
