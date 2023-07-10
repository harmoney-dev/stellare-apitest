import {endpoints} from "../../config";
import {Helper} from "../../utils/helper";
import supertest from "supertest";

export class Financial {
    private readonly _token: string;
    private server: supertest.SuperTest<supertest.Test>;
    
    constructor(server: supertest.SuperTest<supertest.Test>, token: string) {
        this._token = token;
        this.server = server;
    }

    public async submitIncome(body: any) {
        return this.postFinancial(endpoints.stellare.income, body);
    }

    public async submitExpense(body: any) {
        return this.postFinancial(endpoints.stellare.expense, body);
    }

    public async submitAssets(body: any) {
        return this.postFinancial(endpoints.stellare.assets, body);
    }

    public async submitLiabilities(body: any) {
        return this.postFinancial(endpoints.stellare.liabilities, body);
    }

    private async postFinancial(path: string, body: any) {
        const res =  await this.server.post(path).set(this.commonAuth()).send(body)
            // .expect(201);
        return res;
    }
    
    
    public async getProvisoConfig(userId: string, applicationId: string) {
        return this.server.get(endpoints.stellare.bankConfig).set(this.commonAuth()).query({
            'userId': userId,
            'applicationId': applicationId
        }).expect(200);
    }
    
    public async updateProvisoStatus(appRef: string, body: any) {
        return this.server.patch(Helper.formatEndpoint(endpoints.proviso.bsStatus, {appRef: appRef})).set(this.commonAuth())
            .send(body).expect(200);
    }

    public async initProviso() {
        return this.server.get(Helper.formatEndpoint(endpoints.proviso.init, {token: this._token})).expect(200);
    }

    public async selectBank(bank: string) {
        return this.server.get(Helper.formatEndpoint(endpoints.proviso.institution, {token: this._token}))
            .query({'bank': bank}).expect(200);
    }

    public async submitBankDetails( body: any) {
        return this.server.post(Helper.formatEndpoint(endpoints.proviso.submitBank, {token: this._token}))
            .send(body).expect(200);
    }
    
    private commonAuth () {
        return {Authorization: `Bearer ${this._token}`};
    }
}