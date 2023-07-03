import supertest from "supertest";
import {SignUp} from "../payloads/signUp";
import {endpoints} from "../../config";

export class Auth0 {
    private auth0: supertest.SuperTest<supertest.Test>;

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
        const signUp = new SignUp();
        const param = signUp.generateParams();
        const auth0Connection = await this.auth0Get(endpoints.auth0.authorize, '', param);

        const stateRegex = /state=([^&]+)/;
        const match = auth0Connection.headers.location.match(stateRegex);
        const stateValue = match ? match[1] : '';
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

        const codeRegex = /code=([^&]+)/;
        const codeMatch = signUpRes.text.match(codeRegex);
        const code = codeMatch ? codeMatch[1] : ``;
        const authBody = {
            client_id: 'Bq6CTvRJ6YenWav2LiBrdJ9sVckI9L6e',
            code_verifier: signUp.codeVerifier,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://secure.harmoneylabs.com/dashboard',
        }
        const redirectUrl = signUpRes['redirects'][0]
        const urlRegex = `(https://[^/]+)`
        const redirectMatch = redirectUrl.match(urlRegex);
        const redirectDomain = redirectMatch ? redirectMatch[1] : '';
        this.auth0 = supertest(redirectDomain);
        const tokenBody = await this.auth0Post(endpoints.auth0.authToken, '', authBody);

        return tokenBody.body.access_token;
    }
}