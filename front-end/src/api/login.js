import service from '@/utils/axios.config.js';
import axios from 'axios';

const loginService = {
    goLogin: async loginUserDto => {
        const res = await service.post('/api/user/login', loginUserDto);
        localStorage.setItem('access_token', res.data.accessToken || '');
        localStorage.setItem('refresh_token', res.data.refreshToken || '');
        return res;
    },
    refreshToken: async () => {
        const res = await axios.get('/api/user/refresh', {
            params: {
                refreshToken: localStorage.getItem('refresh_token'),
            },
        });
        localStorage.setItem('access_token', res.data.access_token || '');
        localStorage.setItem('refresh_token', res.data.refresh_token || '');
        return res;
    },
    getCaptcha: async email => {
        return await service.get(`/api/user/register-captcha`, {
            params: {
                emailAddress: email,
            },
        });
    },
    goRegister: async registerUserDto => {
        return await service.post('/api/user/register', registerUserDto);
    },
};

export default loginService;
