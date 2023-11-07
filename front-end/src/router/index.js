import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/login/Login.vue';
import Main from '@/pages/main/Main.vue';
import Project from '@/pages/project/Project.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/main',
            component: Main,
        },
        {
            path: '/project',
            component: Project,
        },
    ],
});

export default router;
