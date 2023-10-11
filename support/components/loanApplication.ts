import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";
import {Server} from "./server";

export class LoanApplication extends Server{
    private _loanApplicationId: string = '';

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string, loanApplicationId: string) {
        super(stellare, userToken);
        this._loanApplicationId = loanApplicationId;
    }

    public async submitLoanPurpose(body: any) {
        return this.post(Helper.formatEndpoint(endpoints.stellare.saveLoanPurpose, {applicationId: this._loanApplicationId}), body);
    }

    async getLoanQuote() {
        return this.get(Helper.formatEndpoint(endpoints.stellare.quote, {applicationId: this._loanApplicationId}));
    }

    async submitLoanApplication(body: any) {
        return this.patch(endpoints.stellare.application, body);
    }

    async getRepaymentDetails() {
        return this.get(Helper.formatEndpoint(endpoints.stellare.repaymentDetail, {applicationId: this._loanApplicationId}));
    }

    async submitRepaymentDetails(repaymentPayload: any) {
        return this.post(Helper.formatEndpoint(endpoints.stellare.payment, {applicationId: this._loanApplicationId}), repaymentPayload);
    }

    async acceptLoanAgreement() {
        return this.put(Helper.formatEndpoint(endpoints.stellare.acceptGeneralLoanAgreement, {applicationId: this._loanApplicationId}));
    }

    async acceptLoanDisclosure() {
        return this.put(Helper.formatEndpoint(endpoints.stellare.acceptLoanDisclosure, {applicationId: this._loanApplicationId}));
    }

    async getApplicationStatus(email: string) {
        return this.post(endpoints.stellare.applicationStatus, {email: email}, 200);
    }

    async checkEmailVerifyStatus() {
        return this.get(endpoints.stellare.emailVerifyStatus)
    }
}