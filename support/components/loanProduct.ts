import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";
import {Server} from "./server";

export class LoanProduct extends Server{

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string) {
        super(stellare, userToken);
    }

    public async getLoanPurposeList(productId: string) {
        return this.get(Helper.formatEndpoint(endpoints.stellare.loanPurpose, {productId: productId}));
    }
}