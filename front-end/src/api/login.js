import service from '@/utils/axios.config.js';

const loginService = {
    goLogin: registerUserDto => {
        console.log(loginUserDto);
        return service.post('/api/userLogin', loginUserDto);
    },
    getCaptcha: email => {
        return service.get(`/api/user/register-captcha`, {
            params: {
                emailAddress: email,
            },
        });
    },
    goRegister: registerUserDto => {
        return service.post('/api/user/register', registerUserDto);
    },
};

export default loginService;
