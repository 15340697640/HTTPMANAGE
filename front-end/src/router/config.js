const Login = () => import('@/pages/login/Login.vue');
const Register = () => import('@/pages/register/Register.vue');
const ForgetPassword = () => import('@/pages/forget-password/ForgetPassword.vue');
const Home = () => import('@/pages/home/Home.vue');
const Project = () => import('@/pages/project/Project.vue');
const NotFound = () => import('@/pages/not-found/NotFound.vue');

const Teams = () => import('@/pages/home/teams/Teams.vue');
const CollectionProject = () => import('@/pages/home/collection-project/CollectionProject.vue');
const ApiHub = () => import('@/pages/home/apihub/ApiHub.vue');
const VisitedProject = () => import('@/pages/home/visited-project/VisitedProject.vue');

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/forgetPassword',
        component: ForgetPassword,
    },
    {
        path: '/',
        redirect: '/home/teams',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'project',
                component: Project,
            },
            {
                path: 'teams/:id?',
                component: Teams,
            },
            {
                path: 'collectionProject',
                component: CollectionProject,
            },
            {
                path: 'apiHub',
                component: ApiHub,
            },
            {
                path: 'visitedProject',
                component: VisitedProject,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
];
export default routes;
