import {endpoints} from "../../config";
import {Helper} from "../../utils/helper";
import supertest from "supertest";


export class User {

    private stellare: supertest.SuperTest<supertest.Test>;
    private _userToken: string = '';

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string) {
        this.stellare = stellare;
        this._userToken = userToken;
    }

    public async postUser(path: string, body?: any) {
        return this.stellare.post(path).set('Authorization', 'Bearer ' + this._userToken).send(body).expect(201);
    }

    public async patchUser(path: string, body?: any) {
        return this.stellare.patch(path).set('Authorization', 'Bearer ' + this._userToken).send(body).expect(200);
    }

    public async getUser(path: string, body?: any) {
        return this.stellare.get(path).set('Authorization', 'Bearer ' + this._userToken).send(body).expect(200);
    }

    public async putUser(path: string, body?: any) {
        return this.stellare.put(path).set('Authorization', 'Bearer ' + this._userToken).send(body).expect(200);
    }

    public async saveUsername(userName: string) {
        const patchBody = {preferredName: userName};
        return this.patchUser(endpoints.stellare.users, patchBody);
    }

    public async saveLoanAmount(body: any) {
        return this.patchUser(endpoints.stellare.application, body);
    }

    public async getUserProfile(userId: string) {
        return this.getUser(Helper.formatEndpoint(endpoints.stellare.userProfile, {userId: userId}));
    }

    public async updateUserProfile(userId: string, body: any) {
        return this.putUser(Helper.formatEndpoint(endpoints.stellare.userProfile, {userId: userId}), body);
    }

    public async updateUserAddress(body: any) {
        return this.putUser(Helper.formatEndpoint(endpoints.stellare.address, {address: body.addressId}), body);
    }
}