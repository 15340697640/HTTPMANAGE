import axios from 'axios';
import qs from 'qs';
// import { isPlainObject } from 'is-plain-object';
import md5 from 'blueimp-md5';
import { signKey } from '@/assets/config';
import { message } from 'ant-design-vue';
import loginService from '@/api/login';
import { useRouter } from 'vue-router';

const service = axios.create({
    timeout: 50000,
});

service.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            let time = +new Date(),
                sign = md5(`${accessToken}@${time}@${signKey}`);
            config.headers['authorization'] = 'Bearer ' + accessToken;
            config.headers['time'] = time;
            // 生成签名
            config.headers['sign'] = sign;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        let { data, config } = error.response;
        if (data.statusCode === 401 && !config.url.includes('/user/refresh')) {
            const res = await loginService.refreshToken();

            if (res.status === 200) {
                return axios(config);
            } else {
                const router = useRouter();
                router.push('/login');
                message.error('登录过期，请重新登录');
                return Promise.reject(res.data);
            }
        } else {
            message.error(error.response.data.message);
            return Promise.reject(error);
        }
        message.error(error.response.data.message);
    }
);
export default service;
