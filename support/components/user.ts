import {endpoints} from "../../config";

export class User {
    public static async iamAdmin(iam: any) {
        const userTokenBody = {
            grant_type: 'password',
            username: 'admin',
            password: process.env.iamAdminPassword,
            client_id: 'admin-cli',
            scope: 'openid'
        }

        return await iam.post(endpoints.iam.adminToken)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userTokenBody).expect(200);
    }

    public static async createUser(iam: any, email: string, adminToken: string) {
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

        const response = await iam.post(endpoints.iam.adminUsers).set('Authorization', 'Bearer ' + adminToken).send(body).expect(201);
        return response.status;
    }

    public static async getUserToken(iam: any, email: string) {
        const userTokenBody = {
            grant_type: 'password',
            username: `${email}`,
            password: 'Stellare123.',
            client_id: 'stellare-nz',
            scope: 'openid'
        }
        const res = await iam.post(endpoints.iam.userToken).set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userTokenBody).expect(200);
        console.log('new user email ' + email)
        return res.body.access_token;
    }

    public static async postUser(stellare: any, token: string) {
        return await stellare.post(endpoints.stellare.users).set('Authorization', 'Bearer ' + token).expect(201);
    }

    public static async patchUser(stellare: any, token: string, patchBody: { [key: string]: string }) {
        return await stellare.patch(endpoints.stellare.users).set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(patchBody).expect(200);
    }

    public static async saveUsername(stellare: any, token: string, userName: string) {
        const patchBody = {preferredName: userName};
        return await User.patchUser(stellare, token, patchBody);
    }
}