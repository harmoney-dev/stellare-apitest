import {endpoints} from "../../config";
import {Helper} from "../../utils/helper";
import supertest from "supertest";

export class IDV {
    private _f1Token: string = '';
    private server: supertest.SuperTest<supertest.Test>;

    get f1Token(): string {
        return this._f1Token;
    }

    set f1Token(value: string) {
        this._f1Token = value;
    }

    constructor(server: supertest.SuperTest<supertest.Test>) {
        this.server = server;
    }

    public async connectToF1(token: string, userId: string, country: string) {
        const f1Session = await this.server.get(endpoints.stellare.idvStartSession).set('Authorization', 'Bearer ' + token)
            .query({userId: userId, branch: country})
            .expect(200);
        return f1Session.body.token;
    }

    public async tokenValidation() {
        return this.f1Get(endpoints.frankieOne.tokenValidity);
    }

    public async initSmartUI(f1SessionId: string, customerId: string, events: Array<string>, initBody: any) {
        await this.f1Post(endpoints.frankieOne.event, initBody, 204);
        let body = {}
        for (const item of events) {
            body = {
                name: item,
                timeStamp: (new Date()).toISOString(),
                data: {},
                customerId: customerId,
                sessionId: f1SessionId,
                channel: "smart-ui",
                version: "v4.11.1",
                deviceType: "mobile",
                browser: "chrome"
            }
            await this.f1Post(endpoints.frankieOne.event, body, 204);
            await Helper.delay(500);
        }
    }

    public async submitApplicant(body: any) {
        return this.f1Post(endpoints.frankieOne.applicant, body);
    }

    public async getAddress(address: string) {
        return this.f1Get(endpoints.frankieOne.address, {
            searchTerm: address.replace(' ', '+'),
            'regions[]': 'AUS',
            apikey: 'AIzaSyCypGiHWEMyvlmuQyO0kzOmwDehIBGSk_A'
        });
    }

    public async getFormAddress(f1Token: string, value: string) {
        this.f1Token = f1Token;
        return this.f1Get(Helper.formatEndpoint(endpoints.frankieOne.formAddress, {addressValue: value}), {apikey: 'AIzaSyCypGiHWEMyvlmuQyO0kzOmwDehIBGSk_A'});
    }

    public async getApplicant(entityId: string, f1Token: string) {
        this.f1Token = f1Token;
        await this.f1Get(Helper.formatEndpoint(endpoints.frankieOne.applicantById, {entityId: entityId}));
    }

    public async checkApplication(entityId: string) {
        return this.f1Post(Helper.formatEndpoint(endpoints.frankieOne.checkApplicant, {entityId: entityId}), {deviceCheckDetails: {}});
    }

    private async f1Get(path: string, query?: any) {
        const headers = {'Authorization': this.f1Token, 'Referer': 'https://stellare.harmoneylabs.com/'};
        return this.server.get(path)
            .set(headers)
            .query(query)
            .expect(200);
    }

    private async f1Post(path: string, body?: any, status: number = 201) {
        const headers = {'Authorization': this.f1Token, 'Referer': 'https://stellare.harmoneylabs.com/'};
        return this.server.post(path)
            .set(headers)
            .send(body)
            .expect(status);
    }
}