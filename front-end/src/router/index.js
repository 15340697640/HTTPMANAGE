import { createRouter, createWebHistory } from 'vue-router';
import routesConfig from './config';

// import Login from '@/pages/login/Login.vue';
// import Home from '@/pages/home/Home.vue';
// import Project from '@/pages/project/Project.vue';
// import NotFound from '@/pages/not-found/NotFound.vue';

const Login = () => import('@/pages/login/Login.vue');
const Home = () => import('@/pages/home/Home.vue');
const Project = () => import('@/pages/project/Project.vue');
const NotFound = () => import('@/pages/not-found/NotFound.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [],
        },
        {
            path: '/project',
            component: Project,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
        },
    ],
});

const AddRouter = () => {
    routesConfig.forEach(item => {
        router.addRoute('home', item);
    });
};
AddRouter();
console.log(router.getRoutes());

export default router;
