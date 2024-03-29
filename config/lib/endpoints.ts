export const endpoints = {
    auth0: {
        login: '/u/login',
        authorize: '/authorize',
        signUp: '/u/signup',
        users: '/api/users',
        authToken: '/oauth/token',
    },
    stellare: {
        users: '/api/users',
        product: '/api/loan-products',
        processes: '/api/processes/{processId}',
        userInstance: '/api/user-instances',
        currentTask: '/api/tasks/current-task',
        tasks: '/api/tasks/{taskId}',
        taskVariables: '/api/tasks/{taskId}/variables',
        application: '/api/loan-applications',
        loanPurpose: '/api/loan-products/{productId}/loan-purposes',
        saveLoanPurpose: '/api/loan-applications/{applicationId}/loan-purposes',
        quote: '/api/loan-applications/{applicationId}/quote',
        repaymentDetail: '/api/loan-applications/{applicationId}/repayment-detail',
        payment: '/api/loan-applications/{applicationId}/payment',
        repaymentSchedule: '/api/loan-applications/{applicationId}/repayment-schedule',
        acceptGeneralLoanAgreement: '/api/loan-agreement/{applicationId}/accept-general-loan-agreement',
        acceptLoanDisclosure: '/api/loan-agreement/{applicationId}/accept-loan-disclosure',
        loanAgreementDetails: '/api/loan-agreement/{applicationId}/details',
        idvStartSession: '/api/identity-verifications/machine-session',
        networthSources: '/api/financial-profile/networth-sources?kind={kind}', 
        income: '/api/financial-profile/incomes',
        expense: '/api/financial-profile/expenses',
        assets: '/api/financial-profile/assets',
        liabilities: '/api/financial-profile/liabilities',
        bankConfig: '/api/bank-statement/configuration',
        userProfile: '/api/user-profile/{userId}',
        address: '/api/user-profile/address/{address}',
        emailVerification: '/qa-utils/api/update-email-verification',
        applicationStatus: '/qa-utils/api/fetch-loan-application-info',
        emailVerifyStatus: '/api/emails/trigger-verification'
    },
    frankieOne: {
        tokenValidity: '/data/v2/token-validity',
        event: '/data/v1/events',
        applicant: '/data/v2/applicants/?no_address=false',
        address: '/data/v1/address/search',
        formAddress: '/data/v2/address/{addressValue}',
        applicantById: '/data/v2/applicants/{entityId}',
        checkApplicant: '/data/v1/applicants/{entityId}/checks',
    },
    proviso: {
        init: '/v1/customer/initialise/{token}',
        institution: '/v1/customer/initialise/{token}/institution',
        submitBank: '/v1/customer/initialise/{token}/validate',
        bsStatus: '/api/bank-statement/{appRef}',
    }
}