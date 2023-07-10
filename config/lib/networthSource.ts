export class NetworthSource {
    static keyIdMap: Record<string, number> = {
        INCOME_SALARY_WAGES_ID: 1,
        INCOME_SELF_EMPLOYED_ID: 2,
        INCOME_RENT_ID: 3,
        INCOME_BENEFIT_ID: 16,
        INCOME_PENSION_ID: 18,
        INCOME_INTEREST_DIVIDEND_ID: 19,
        INCOME_SPOUSAL_SUPPORT_ID: 17,
        INCOME_CHILD_SUPPORT_ID: 32,
        INCOME_OTHER_ID: 4,
        INCOME_NO_ID: 15,
        INCOME_CHANGE_ID: 37,
        EXPENSE_RENT_ID: 31,
        EXPENSE_CHILD_SUPPORT_ID: 33,
        EXPENSE_SCHOOL_FEES_ID: 34,
        EXPENSE_UTILITIES_ID: 5,
        EXPENSE_GROCERIES_ID: 6,
        EXPENSE_TRANSPORT_ID: 7,
        EXPENSE_INSURANCE_ID: 8,
        EXPENSE_MEDICAL_ID: 14,
        EXPENSE_CHILD_CARE_ID: 35,
        EXPENSE_OTHER_ID: 13,
        EXPENSE_NO_ID: 9,
        EXPENSE_CHANGE_ID: 38,
        EXPENSE_HOUSEHOLD_CHANGE_ID: 36,
        LIABILITY_CREDIT_CARD_ID: 9,
        LIABILITY_PERSONAL_LOAN_ID: 10,
        LIABILITY_MORTGAGE_ID: 11,
        LIABILITY_OVERDRAFT_ID: 22,
        LIABILITY_BUY_NOW_PAY_LATER_ID: 30,
        LIABILITY_OTHER_ID: 12,
        LIABILITY_NO_ID: 39,
        ASSET_HOME_APARTMENT_ID: 23,
        ASSET_VEHICLE_ID: 24,
        ASSET_SAVINGS_ID: 25,
        ASSET_SHARDS_BONDS_FUNDS_ID: 27,
        ASSET_BOAT_ID: 28,
        ASSET_OTHER_ID: 29,
        ASSET_NO_ID: 26,
    };

    static getKeyId = (partialKey: string): number | undefined => {
        const formattedPartialKey = partialKey
            .toUpperCase()
            .replace(/\W/g, ' ')
            .replace(/\s+/g, '_');

        const keys = Object.keys(this.keyIdMap);

        for (const key of keys) {
            if (key.includes(formattedPartialKey)) {
                return this.keyIdMap[key];
            }
        }
        return undefined;
    }
}