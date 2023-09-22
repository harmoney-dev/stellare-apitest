import {endpoints} from "../../config";
import {Helper} from "../../utils/helper";
import supertest from "supertest";
import {Server} from "./server";

export class Financial extends Server{
    private readonly _provisoToken: string;
    
    constructor(server: supertest.SuperTest<supertest.Test>, token: string) {
        super(server, token);
        this._provisoToken = token;
    }

    public async submitIncome(body: any) {
        return this.post(endpoints.stellare.income, body);
    }

    public async submitExpense(body: any) {
        return this.post(endpoints.stellare.expense, body);
    }

    public async submitAssets(body: any) {
        return this.post(endpoints.stellare.assets, body);
    }

    public async submitLiabilities(body: any) {
        return this.post(endpoints.stellare.liabilities, body);
    }
    
    public async getProvisoConfig(userId: string, applicationId: string) {
        return this.query(endpoints.stellare.bankConfig, {
            'userId': userId,
            'applicationId': applicationId
        });
    }
    
    public async updateProvisoStatus(appRef: string, body: any) {
        return this.patch(Helper.formatEndpoint(endpoints.proviso.bsStatus, {appRef: appRef}), body);
    }

    public async initProviso() {
        return this.get(Helper.formatEndpoint(endpoints.proviso.init, {token: this._provisoToken}));
    }

    public async selectBank(bank: string) {
        return this.query(Helper.formatEndpoint(endpoints.proviso.institution, {token: this._provisoToken}), {'bank': bank});
    }

    public async submitBankDetails( body: any) {
        return this.post(Helper.formatEndpoint(endpoints.proviso.submitBank, {token: this._provisoToken}), body, 200);
    }
}