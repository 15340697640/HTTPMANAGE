import axios from 'axios';
import qs from 'qs';
// import { isPlainObject } from 'is-plain-object';
import md5 from 'blueimp-md5';
import { signKey } from '@/assets/config';
import { message } from 'ant-design-vue';

const service = axios.create({
    timeout: 5000,
});

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            let time = +new Date(),
                sign = md5(`${token}@${time}@${signKey}`);
            config.headers['Authorzation'] = token;
            config.headers['Time'] = time;
            // 生成签名
            config.headers['Sign'] = sign;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        message.error(error.response.data.message);
        return Promise.reject(error);
    }
);
export default service;
