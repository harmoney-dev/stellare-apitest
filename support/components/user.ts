import {endpoints} from "../../config";
import {Helper} from "../../utils/helper";
import supertest from "supertest";
import {Server} from "./server";

export class User extends Server{

    constructor(stellare: supertest.SuperTest<supertest.Test>, userToken: string) {
        super(stellare, userToken);
    }

    public async saveUsername(userName: string) {
        const patchBody = {preferredName: userName};
        return this.patch(endpoints.stellare.users, patchBody);
    }

    public async saveLoanAmount(body: any) {
        return this.patch(endpoints.stellare.application, body);
    }

    public async verifyEmail(email: string) {
        const patchBody = {email: email};
        return this.patch(endpoints.stellare.emailVerification, patchBody);
    }

    public async getUserProfile(userId: string) {
        return this.get(Helper.formatEndpoint(endpoints.stellare.userProfile, {userId: userId}));
    }

    public async updateUserProfile(userId: string, body: any) {
        return this.put(Helper.formatEndpoint(endpoints.stellare.userProfile, {userId: userId}), body);
    }

    public async updateUserAddress(body: any) {
        return this.put(Helper.formatEndpoint(endpoints.stellare.address, {address: body.id}), body);
    }

    async saveMobileNumber(mobileNumber: string) {
        return this.patch(endpoints.stellare.users, {mobilePhoneNumber: mobileNumber});
    }

    async initUser() {
        return this.post(endpoints.stellare.users);
    }
}