import crypto from 'crypto';
import base64url from 'base64url';

export class SignUp {
    private _codeVerifier: string = '';

    get codeVerifier() {
        return this._codeVerifier;
    }

    set codeVerifier(value) {
        this._codeVerifier = value;
    }

    private generateRandomValue(length: number): string {
        return base64url(crypto.randomBytes(length));
    }

    private generateCodeVerifier(): string {
        return this.generateRandomValue(32);
    }

    private generateCodeChallenge(codeVerifier: string): string {
        const hashedCodeVerifier = crypto.createHash('sha256').update(codeVerifier).digest();
        return base64url(hashedCodeVerifier);
    }

    public generateParams(): Record<string, string> {
        const state = this.generateRandomValue(32);
        const nonce = this.generateRandomValue(32);
        const codeVerifier = this.generateCodeVerifier();
        this._codeVerifier = codeVerifier;
        const codeChallenge = this.generateCodeChallenge(codeVerifier);

        const params: Record<string, string> = {
            client_id: 'Bq6CTvRJ6YenWav2LiBrdJ9sVckI9L6e',
            scope: 'openid profile email',
            redirect_uri: 'https://secure.harmoneylabs.com/dashboard',
            audience: 'https://harmonize.harmoneylabs.com/api',
            response_type: 'code',
            response_mode: 'query',
            state: state,
            nonce: nonce,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            auth0Client: base64url(JSON.stringify({ name: 'auth0-react', version: '1.0.0' })),
        };

        return params;
    }
}
