import {Helper} from "../../utils/helper";

export class LoanDetails {
    public static getLoanApplicationPayload(loanApplicationId: string, loanAmount: number, term: number) {
        const expiryDate = Helper.getDateAfter(60);
        return {
            "id": loanApplicationId,
            "termInMonths": term * 12,
            "fundedAmount": loanAmount,
            "repaymentFrequency": "monthly",
            "selectedOfferId": "mockOfferId",
            "quoteExpiryAt": expiryDate,
            "applicationExpiryAt": expiryDate,
            "status": "application_in_progress"
        }
    }

    public static getRepaymentDetailsPayload(loanApplicationId: string, paymentInfo: any, fre: string, offset: number) {
        const bsb = paymentInfo.bankAccounts[0].bsb;
        const accountNumber = paymentInfo.bankAccounts[0].accountNumber;
        const startDate = this.getStartDay(paymentInfo, offset);
        return {
            "paidTo":
                {
                    "bsb": bsb,
                    "accountNumber": accountNumber
                },
            "repaidFrom":
                {
                    "bsb": bsb,
                    "accountNumber": accountNumber
                },
            "repaymentSchedule":
                {
                    "loanApplicationId": loanApplicationId,
                    "startDate": startDate,
                    "frequency": fre
                }
        }
    }

    private static getStartDay(paymentInfo: any, offset: number) {
        const startDate = new Date(paymentInfo.startDate);
        const endDate = new Date(paymentInfo.endDate);
        let day = this.addDays(startDate, offset);
        if (day > endDate) {
            day = endDate;
        }

        return day.toISOString().split('T')[0];
    }

    private static addDays(date: Date, days: number) {
        date.setDate(date.getDate() + days);
        return date;
    }
}