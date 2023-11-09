import service from '@/utils/axios.config';

const loginService = {
    goLogin: (account, password) => {
        return goLogin.post('/api/login', { account, password });
    },
};

export default loginService;
