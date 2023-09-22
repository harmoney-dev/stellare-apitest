import {NetworthSource} from "../../config/lib/networthSource";
import {DataTable} from "@cucumber/cucumber";

export class Income {

    static getIncomesWithChangeStatus(taskId: string, table: DataTable) {
        const body: any = this.getIncomes(taskId, table);
        if (!table.hashes()[0]['income change']) {
            const incomeChange = {
                networthSourceId: NetworthSource.keyIdMap['INCOME_CHANGE_ID'],
                expectIncreaseDecreaseChange: false,
                increaseDecreaseChangeValue: "",
                declaredAmount: 0,
                frequency: "weekly"
            }

            body.incomes.push(incomeChange);
        }

        return body;
    }

    static getIncomes(taskId: string, table: DataTable) {
        const dataMap = table.raw();

        const keys = dataMap[0];
        const values = dataMap[1];

        const body = {
            taskId: taskId,
            incomes: [] as any
        };

        keys.forEach((key: any, index: any) => {
            let income: any;
            let networth = NetworthSource.getKeyId(key);
            if (networth && values[index]) {
                income = this.getIncome(networth, values[index]);
                body.incomes.push(income)
            }
        });

        return body;
    }

    private static getIncome(networth: number, value: any) {
        const [amount, frequency, info] = value.split('-');
        let payload: any = {
            networthSourceId: networth,
            declaredAmount: parseInt(amount),
            frequency: frequency == '' ? null : frequency,
        }

        switch (networth) {
            case NetworthSource.keyIdMap['INCOME_SALARY_WAGES_ID']:
                payload.employmentType = info.replaceAll(' ', '_');
                payload.seasonalWorkingMonths = '';
                payload.employmentCode = "OFFICE";
                payload.employmentStartDate = "2004-12-31T11:00:00.000Z";
                payload.startEmploymentMonth = "01";
                payload.startEmploymentYear = "2005";
                break;
            case NetworthSource.keyIdMap['INCOME_BENEFIT_ID']:
                payload.benefitType = info;
                payload.benefitName = '';
                break;
            case NetworthSource.keyIdMap['INCOME_RENT_ID']:
                payload.isRentalIncomeShared = info;
                break;
            case NetworthSource.keyIdMap['INCOME_CHANGE_ID']:
                payload.increaseDecreaseChangeValue = info;
                payload.expectIncreaseDecreaseChange = true;
                break;
            case NetworthSource.keyIdMap['INCOME_PARTNER_ID']:
                payload.hasPartnerIncome = info === 'true';
                break;
        }

        return payload;
    }
}