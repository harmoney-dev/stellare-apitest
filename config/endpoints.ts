export const endpoints = {
    iam: {
        users: '/api/users',
        userToken: '/realms/customer/protocol/openid-connect/token',
        adminToken: '/realms/master/protocol/openid-connect/token',
        adminUsers: '/admin/realms/customer/users',
    },
    stellare: {
        users: '/api/users',
        product: '/api/product',
        userInstance: '/api/user-instances',
        currentTask: '/api/tasks/current-task',
        tasks: '/api/tasks/'
    }
}