import service from '@/utils/axios.config.js';

const loginService = {
    goLogin: (account, password) => {
        return service.post('/api/login', { account, password });
    },
};

export default loginService;
