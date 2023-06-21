import {DataTable} from "@cucumber/cucumber";
import {NetworthSource} from "../../config/lib/networthSource";

export class Debt {
    static getDebts(taskId: string, table: DataTable) {
        const dataMap = table.hashes();
        const body = {
            taskId: taskId,
            liabilities: [] as any
        };

        for (let i = 1; i < dataMap.length; i++) {
            const values = dataMap[i];
            let debt: any;
            if (values['repaymentAmount']) {
                debt = this.getDebt(values);
                body.liabilities.push(debt)
            }

        }

        return body;
    }

    private static getDebt(data: any) {
        const id = NetworthSource.getKeyId(data['type']);

        let payload: any = {
            networthSourceId: id,
            repaymentAmount: parseInt(data['repaymentAmount']),
            frequency: data['frequency'],
            provider: data['provider'],
            otherProvider: '',
        }
        if (data['paysOutstandingBalance']) payload.paysOutstandingBalance = data['paysOutstandingBalance'];
        if (data['outstandingBalance']) payload.outstandingBalance = parseInt(data['outstandingBalance']);
        if (data['isMortgageShared']) payload.isMortgageShared = data['isMortgageShared'];

        return payload;
    }
}