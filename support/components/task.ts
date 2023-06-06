import {endpoints} from "../../config";
import {helper} from "../../utils/helper";

export class task {
    public static async kickoffJourney(stellare: any, userId: string) {
        const product = await stellare.get(endpoints.stellare.product).expect(200);
        let processId = '';
        product.body.forEach((process: { [key: string]: string }) => {
            if (process.bpmnProcessId === 'quick-quote') {
                processId = process.id;
            }
        });

        const res = await stellare.get(endpoints.stellare.product + '/' + processId).expect(200);
        const journeyId = res.body.id;
        const userInstanceBody = {userId: userId, processId: processId};
        await stellare.post(endpoints.stellare.userInstance).send(userInstanceBody).expect(201);

        return journeyId;
    }


    static async waitTaskActive(stellare: any, userId: string, journeyId: any) {
        let status = 400;
        let res;

        for (let i = 0; i < 60; i++) {
            if (status == 400) {
                res = await task.getCurrentTask(stellare, userId, journeyId);
                status = res.body.status;
                await helper.delay(1000);
            } else {
                break;
            }
        }

        return res;
    }

    static async completeTask(stellare: any, taskId: string, token: string, variables: string) {
        return await stellare.patch(endpoints.stellare.tasks + taskId)
            .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token).send({variables:`"${variables}"`}).expect(200);
    }

    static async getCurrentTask(stellare: any, userId: string, journeyId: any) {
        return await stellare.get(endpoints.stellare.currentTask).send({userId: userId, journeyId: journeyId});
    }
}
