import supertest from "supertest";

export class Server{
    private server: supertest.SuperTest<supertest.Test>
    private _token: string = '';
    private STATUS_OK = 200;
    private STATUS_CREATED = 201;

    constructor(server: supertest.SuperTest<supertest.Test>, token: string) {
        this.server = server;
        this._token = token;
    }

    public async get(path: string) {
        return this.server.get(path).set('Authorization', 'Bearer ' + this._token).expect(this.STATUS_OK);
    }

    public async post(path: string, body?: any, status= this.STATUS_CREATED) {
        return this.server.post(path).set('Authorization', 'Bearer ' + this._token).send(body).expect(status);
    }

    public async patch(path: string, body?: any) {
        return this.server.patch(path).set('Authorization', 'Bearer ' + this._token).send(body).expect(this.STATUS_OK);
    }

    public async put(path: string, body?: any) {
        return this.server.put(path).set('Authorization', 'Bearer ' + this._token).send(body).expect(this.STATUS_OK);
    }

    public async query(path: string, query?: any) {
        return this.server.get(path).set('Authorization', 'Bearer ' + this._token).query(query).expect(this.STATUS_OK);
    }

    public async queryWithoutCheck(path: string, query?: any) {
        return this.server.get(path).set('Authorization', 'Bearer ' + this._token).query(query);
    }
}