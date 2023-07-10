import {DataTable} from "@cucumber/cucumber";
import {NetworthSource} from "../../config/lib/networthSource";

export class Expense {
    static getExpensesWithChangeStatus(taskId: string, table: DataTable) {
        const body:any = this.getExpensePayload(taskId, table);
        if (!table.hashes()[0]['expense change']) {
            const expenseChange = {
                networthSourceId: NetworthSource.keyIdMap['EXPENSE_CHANGE_ID'],
                expectIncreaseDecreaseChange: false,
                increaseDecreaseChangeValue: "",
                declaredAmount: 0,
                frequency: "weekly"
            }

            body.expenses.push(expenseChange);
        }

        return body;
    }

    static getExpensePayload(taskId: string, table: DataTable) {
        const dataMap = table.raw();

        const keys = dataMap[0];
        const values = dataMap[1];

        const body: any = {
            taskId: taskId,
            expenses: []
        };

        keys.forEach((key: any, index: any) => {
            let expense: any;
            let networth = NetworthSource.getKeyId(key);
            if ( networth && values[index] && !key.toLowerCase().includes('income')) {
                expense = this.getExpense(networth, values[index]);
                body.expenses.push(expense)
            }
        });

        return body;
    }

    private static getExpense(networth: number, value: string) {
        const [amount, frequency, info] = value.split('-');
        let payload: any = {
            networthSourceId: networth,
            declaredAmount: parseInt(amount),
        };
        if (frequency) payload.frequency = frequency;
        switch (networth) {
            case NetworthSource.keyIdMap['EXPENSE_HOUSEHOLD_CHANGE_ID']:
                payload.householdExpenseChange = info;
                break;
            case NetworthSource.keyIdMap['EXPENSE_CHILD_SUPPORT_ID']:
                payload.deductedFromIncome = 'yes';
                break;
            case NetworthSource.keyIdMap['EXPENSE_OTHER_ID']:
                payload.otherExpenseType = info;
                break;
            case NetworthSource.keyIdMap['EXPENSE_CHANGE_ID']:
                payload.expectIncreaseDecreaseChange = true;
                payload.increaseDecreaseChangeValue = info;
                break;
        }

        return payload;
    }
}