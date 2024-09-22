const endpoints = {
    baseUrl: 'http://127.0.0.1:8000/api',
    auth: {
        token: '/auth/token/',
        tokenRefresh: '/auth/token/refresh/',
        signOut: '/auth/sign-out/',
    },
    account: {
        accountInfo: '/account/me/',
        createProfile: '/account/create/',
        updateProfile: '/account/update/',
    },
    user: {},
    project: {
        search: '/project/search/',
        create: '/project/create/',
        detail: '/project/detail/',
    },
    issue: {
        create: '/issue/create/',
        update: '/issue/',
        detail: '/issue/detail/',
    },
}

export default endpoints;