import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";

export class LoanApplication {
    private stellare: supertest.SuperTest<supertest.Test>;
    private _userToken: string = '';

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string) {
        this.stellare = stellare;
        this._userToken = userToken;
    }

    public async postLoanProduct(path: string, body?: any) {
        return this.stellare.post(path).set('Authorization', 'Bearer ' + this._userToken).send(body).expect(201);
    }

    public async submitLoanPurpose(applicationId: string, body: any) {
        return this.postLoanProduct(Helper.formatEndpoint(endpoints.stellare.saveLoanPurpose, {applicationId: applicationId}), body);
    }
}