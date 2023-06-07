import {endpoints} from "../../config";
import {helper} from "../../utils/helper";

export class task {
    public static async kickoffJourney(stellare: any, userId: string, token: string) {
        const product = await stellare.get(endpoints.stellare.product).set('Authorization', 'Bearer ' + token).send({branch: 'AU'}).expect(200);
        let processId = '';
        product.body.forEach((process: { [key: string]: string }) => {
            if (process.name === 'Quick quote') {
                processId = process.processId;
            }
        });

        const res = await stellare.get(endpoints.stellare.processes + '/' + processId).expect(200);
        const journeyId = res.body.id;
        const userInstanceBody = {userId: userId, processId: processId};
        await stellare.post(endpoints.stellare.userInstance).send(userInstanceBody).expect(201);

        return journeyId;
    }


    static async waitTaskActive(stellare: any, userId: string, journeyId: any) {
        let res = await task.getCurrentTask(stellare, userId, journeyId);
        let status = res.status;
        for (let i = 0; i < 60; i++) {
            if (status == 404) {
                res = await task.getCurrentTask(stellare, userId, journeyId);
                status = res.status;
                await helper.delay(1000);
            } else {
                break;
            }
        }

        return res;
    }

    static async completeTask(stellare: any, taskId: string, token: string, variables: string) {
        return await stellare.patch(endpoints.stellare.tasks + taskId)
            .set('Authorization', 'Bearer ' + token).send({variables:variables}).expect(200);
    }

    static async getCurrentTask(stellare: any, userId: string, journeyId: any) {
        return await stellare.get(endpoints.stellare.currentTask).query({userId: userId, journeyId: journeyId});
    }
}
