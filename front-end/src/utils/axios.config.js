import axios from 'axios';
import qs from 'qs';
import { isPlainObject } from 'is-plain-object';
import md5 from 'blueimp-md5';

const service = axios.create({
    timeout: 500,
    transformRequest: data => {
        console.log('转换前', data);
        if (isPlainObject(data)) {
            console.log('转换后', qs.stringify(data));
            return qs.stringify(data);
        }
        return data;
    },
});

service.interceptors.request.use(
    config => {
        token = localStorage.getItem('token');
        if (token) {
            let time = +new Date(),
                sign = md5(`${token}@${time}@蜜雪冰城甜蜜蜜`);
            config.headers['authorzation'] = token;
            config.headers['time'] = time;
            // 生成签名
            config.headers['sign'] = sign;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(reason);
    }
);
export default service;
