import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";

export class Task {

    private stellare: supertest.SuperTest<supertest.Test>
    private _token: string = '';


    constructor(stellare: supertest.SuperTest<supertest.Test>, token: string) {
        this.stellare = stellare;
        this._token = token;
    }

    private async getTask(path: string, status: number = 200, body?: any) {
        return this.stellare.get(path).set('Authorization', 'Bearer ' + this._token).send(body).expect(status);
    }

    private async postTask(path: string, status: number = 201, body?: any) {
        return this.stellare.post(path).set('Authorization', 'Bearer ' + this._token).send(body).expect(status);
    }

    public async kickoffJourney(userId: string) {
        const product = await this.getTask(endpoints.stellare.product, 200, {branch: 'AU'})
        let processId = '';
        let productId = '';

        if (product.body.length === 1) {
            processId = product.body[0].processId;
            productId = product.body[0].id;
        } else {
            product.body.forEach((p: { [key: string]: string }) => {
                if (p.name.toLowerCase() === 'personal loan') {
                    processId = p.processId;
                    productId = p.id;
                }
            });
        }
        const res = await this.getTask(Helper.formatEndpoint(endpoints.stellare.processes, { processId: processId }))
        const journeyId = res.body.id;
        const userInstanceBody = {userId: userId, productId: productId};
        await this.postTask(endpoints.stellare.userInstance, 201, userInstanceBody);

        return { journeyId: journeyId, productId: productId };
    }

    public async getTaskVariable(taskId: string) {
        return this.getTask(Helper.formatEndpoint(endpoints.stellare.taskVariables, {taskId: taskId}));
    }

    public async waitTaskActive(userId: string, journeyId: any) {
        let res = await this.getCurrentTask(userId, journeyId);
        let status = res.status;
        for (let i = 0; i < 60; i++) {
            if (status == 404) {
                res = await this.getCurrentTask( userId, journeyId);
                status = res.status;
                await Helper.delay(1000);
            } else {
                break;
            }
        }

        return res;
    }

    public async completeTask(taskId: string, token: string, variables: any) {
        return this.stellare.patch(Helper.formatEndpoint(endpoints.stellare.tasks, {taskId: taskId}))
            .set('Authorization', 'Bearer ' + token).send(variables).expect(200);
    }

    public async getCurrentTask(userId: string, journeyId: any) {
        return this.queryTask(endpoints.stellare.currentTask,  {userId: userId, journeyId: journeyId});
    }

    private async queryTask(path: string, query?: any) {
        return this.stellare.get(path).set('Authorization', 'Bearer ' + this._token).query(query);
    }
}
