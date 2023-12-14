import service from '@/utils/axios.config.js';

const loginService = {
    /**
     * 登录
     * @param loginUserDto
     * @returns {Promise<AxiosResponse<T>>}
     */
    goLogin: async loginUserDto => {
        const res = await service.post('/api/user/login', loginUserDto);
        localStorage.setItem('access_token', res.data.accessToken || '');
        localStorage.setItem('refresh_token', res.data.refreshToken || '');
        return res;
    },
    /**
     * 刷新token
     * @returns {Promise<AxiosResponse<T>>}
     */
    refreshToken: async () => {
        const res = await service.get('/api/user/refresh', {
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
    /**
     * 注册
     * @param registerUserDto
     * @returns {Promise<AxiosResponse<T>>}
     */
    goRegister: async registerUserDto => {
        return await service.post('/api/user/register', registerUserDto);
    },
};

export default loginService;
