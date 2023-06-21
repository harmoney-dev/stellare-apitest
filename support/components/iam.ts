import {endpoints} from "../../config";
import supertest, {SuperTest} from "supertest";

export class IAM {
    public async iamAdmin() {
        const userTokenBody = {
            grant_type: 'password',
            username: 'admin',
            password: process.env.iamAdminPassword,
            client_id: 'admin-cli',
            scope: 'openid'
        }

        return this.iamPostForm(endpoints.iam.adminToken, 200, userTokenBody);
    }

    public async createUser(email: string) {
        const body = {
            email: `${email}`,
            enabled: true,
            credentials: [
                {
                    type: "password",
                    value: "Stellare123.",
                    temporary: false
                }
            ]
        };
        return this.iamPost(endpoints.iam.adminUsers, 201, body);
    }

    public async getUserToken(email: string) {
        const userTokenBody = {
            grant_type: 'password',
            username: `${email}`,
            password: 'Stellare123.',
            client_id: 'stellare-nz',
            scope: 'openid'
        }
        const response = await this.iamPostForm(endpoints.iam.userToken, 200, userTokenBody);
        return response.body.access_token;
    }

    private iam: supertest.SuperTest<supertest.Test>;
    private _adminToken: string = '';

    get adminToken() {
        return this._adminToken;
    }

    set adminToken(value: string) {
        this._adminToken = value;
    }

    constructor(iam: supertest.SuperTest<supertest.Test>) {
        this.iam = iam;
    }

    private async iamPostForm(path: string, status: number = 201, body?: any) {
        return this.iam.post(path).set('Content-Type', 'application/x-www-form-urlencoded').send(body).expect(status);
    }

    private async iamPost(path: string, status: number = 201, body?: any) {
        return this.iam.post(path).set('Authorization', 'Bearer ' + this.adminToken).send(body).expect(status);
    }
}