import supertest from "supertest";
import {SignUp} from "../payloads/signUp";
import {endpoints} from "../../config";

export class Auth0 {
    private auth0: supertest.SuperTest<supertest.Test>;
    private signUp = new SignUp();

    constructor(auth0: supertest.SuperTest<supertest.Test>) {
        this.auth0 = auth0;
    }

    private async auth0Get(path: string, cookie: any, query?: any) {
        return this.auth0.get(path).set('Cookie', cookie).query(query);
    }

    private async auth0Post(path: string, cookie: any, body?: any) {
        return this.auth0.post(path).set('Cookie', cookie).set('Content-Type', 'application/x-www-form-urlencoded').redirects(1).send(body);
    }

    async createUser(email: string) {
        const auth0Connection = await this.connectAuth0();
        const stateValue = await this.getAuthState(auth0Connection);
        const cookie = auth0Connection.headers['set-cookie'];

        const authGetRes = await this.auth0Get(endpoints.auth0.login, cookie, {state: stateValue});
        const signUpGet = await this.auth0Get(endpoints.auth0.signUp, cookie, {state: stateValue});

        const signUpBody = {
            state: stateValue,
            strengthPolicy: 'good',
            'complexityOptions.minLength': undefined,
            email: email,
            password: 'Stellare123.',
            action: 'default'
        }
        const signUpRes = await this.auth0Post(endpoints.auth0.signUp, cookie, signUpBody);
        const authBody = await this.getAuthTokenBody(signUpRes);
        const tokenBody = await this.auth0Post(endpoints.auth0.authToken, '', authBody);

        return tokenBody.body.access_token;
    }

    async connectAuth0() {
        const param = this.signUp.generateParams();
        return this.auth0Get(endpoints.auth0.authorize, '', param);
    }

    async getAuthState(auth0Connection: any) {
        const stateRegex = /state=([^&]+)/;
        const match = auth0Connection.headers.location.match(stateRegex);
        return match ? match[1] : '';
    }

    async signIn(email: string, password: string) {
        const auth0Connection = await this.connectAuth0();
        const stateValue = await this.getAuthState(auth0Connection);
        const cookie = auth0Connection.headers['set-cookie'];

        const authGetRes = await this.auth0Get(endpoints.auth0.login, cookie, {state: stateValue});

        const signInBody = {
            state: stateValue,
            username: email,
            password: password,
            action: 'default'
        }
        const signInPath = endpoints.auth0.login + '?state=' + stateValue;
        const signInRes = await this.auth0Post(signInPath, cookie, signInBody);
        const authBody = await this.getAuthTokenBody(signInRes);

        const tokenBody = await this.auth0Post(endpoints.auth0.authToken, '', authBody);

        return tokenBody.body.access_token;
    }

    async getAuthTokenBody(connectionRes: any) {
        const codeRegex = /code=([^&]+)/;
        const codeMatch = connectionRes.text.match(codeRegex);
        const code = codeMatch ? codeMatch[1] : ``;

        const redirectUrl = connectionRes['redirects'][0]
        const urlRegex = `(https://[^/]+)`
        const redirectMatch = redirectUrl.match(urlRegex);
        const redirectDomain = redirectMatch ? redirectMatch[1] : '';
        this.auth0 = supertest(redirectDomain);

        return {
            client_id: 'Bq6CTvRJ6YenWav2LiBrdJ9sVckI9L6e',
            code_verifier: this.signUp.codeVerifier,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://secure.harmoneylabs.com/dashboard',
        }
    }
}