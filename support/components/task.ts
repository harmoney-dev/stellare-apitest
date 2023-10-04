import {Helper} from "../../utils/helper";
import {endpoints} from "../../config";
import supertest from "supertest";
import {Server} from "./server";

export class Task extends Server{

    constructor(stellare: supertest.SuperTest<supertest.Test>, token: string) {
        super(stellare, token);
    }

    public async kickoffJourney(userId: string) {
        const product = await this.query(endpoints.stellare.product, {branch: 'AU'})
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
        const res = await this.get(Helper.formatEndpoint(endpoints.stellare.processes, { processId: processId }))
        const journeyId = res.body.id;
        const userInstanceBody = {userId: userId, productId: productId};
        await this.post(endpoints.stellare.userInstance, userInstanceBody);

        return { journeyId: journeyId, productId: productId };
    }

    public async getTaskVariable(taskId: string) {
        return this.get(Helper.formatEndpoint(endpoints.stellare.taskVariables, {taskId: taskId}));
    }

    public async waitTaskActive(userId: string, journeyId: any, taskName: string) {
        let res = await this.getCurrentTask(userId, journeyId);
        if (taskName === 'user-task-money-disbursing') return res;

        let status = res.status;
        for (let i = 0; i < 120; i++) {
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
        try {
            return this.patch(Helper.formatEndpoint(endpoints.stellare.tasks, {taskId: taskId}), variables);
        } catch (e) {
            await Helper.delay(2000);
            return this.patch(Helper.formatEndpoint(endpoints.stellare.tasks, {taskId: taskId}), variables);
        }
    }

    public async getCurrentTask(userId: string, journeyId: any) {
        return this.queryWithoutCheck(endpoints.stellare.currentTask,  {userId: userId, journeyId: journeyId});
    }
}
