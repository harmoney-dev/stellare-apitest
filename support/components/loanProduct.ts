import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";

export class LoanProduct {
    private stellare: supertest.SuperTest<supertest.Test>;
    private _userToken: string = '';

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string) {
        this.stellare = stellare;
        this._userToken = userToken;
    }

    public async getLoanProduct(path: string) {
        return this.stellare.get(path).set('Authorization', 'Bearer ' + this._userToken).expect(200);
    }

    public async getLoanPurposeList(productId: string) {
        return this.getLoanProduct(Helper.formatEndpoint(endpoints.stellare.loanPurpose, {productId: productId}));
    }
}