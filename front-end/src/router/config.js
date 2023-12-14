const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/register/Register.vue'),
    },
    {
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: () => import('@/pages/forget-password/ForgetPassword.vue'),
    },
    {
        path: '/',
        redirect: '/home/teams',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/Home.vue'),
        children: [
            {
                path: 'project',
                component: () => import('@/pages/project/Project.vue'),
            },
            {
                path: 'teams/:id?',
                component: () => import('@/pages/home/teams/Teams.vue'),
            },
            {
                path: 'collectionProject',
                component: () => import('@/pages/home/collection-project/CollectionProject.vue'),
            },
            {
                path: 'apiHub',
                component: () => import('@/pages/home/apihub/ApiHub.vue'),
            },
            {
                path: 'visitedProject',
                component: () => import('@/pages/home/visited-project/VisitedProject.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/not-found/NotFound.vue'),
    },
];
export default routes;
