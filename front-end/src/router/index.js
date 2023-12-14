import { createRouter, createWebHistory } from 'vue-router';
import routes from './config';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 每次路由跳转前判断用户是否登录
router.beforeEach((to, from) => {
    if (to.name === 'login' || to.name === 'register' || to.name === 'forgetPassword') {
        return true;
    } else {
        if (!localStorage.getItem('access_token')) {
            return { name: 'login' };
        } else {
            return true;
        }
    }
});

export default router;
