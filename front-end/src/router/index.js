import { createRouter, createWebHistory } from 'vue-router';
import routes from './config';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 每次路由跳转前判断用户是否登录
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next();
    } else {
        if (!localStorage.getItem('access_token')) {
            next({
                path: 'login',
            });
        } else {
            next();
        }
    }
});

// console.log(router.getRoutes());

export default router;
