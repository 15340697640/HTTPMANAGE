<template>
    <div class="login-box">
        <a-form
            :model="loginForm"
            :rules="rules"
            class="login-form"
            @finish="onFinish"
        >
            <a-form-item
                label="Account"
                name="account"
            >
                <a-input v-model:value="loginForm.account">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item
                label="Password"
                name="password"
            >
                <a-input-password v-model:value="loginForm.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-form-item
                    name="remember"
                    no-style
                >
                    <a-checkbox v-model:checked="loginForm.remember">Remember me</a-checkbox>
                </a-form-item>
                <router-link
                    to="/forgetPassword"
                    class="login-form-forgot"
                >
                    <span>Forgot password</span>
                </router-link>
            </a-form-item>

            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                >
                    Log in
                </a-button>
                Or
                <router-link to="/register"><span>register now!</span></router-link>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
// Componenties
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
// Dependencies
import { reactive } from 'vue';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import loginService from '@/api/login';
import router from '@/router';
import md5 from 'blueimp-md5';
import { passwordKey } from '@/assets/config';

// 先从本地取值
const _account = Cookies.get('account') ? Cookies.get('account') : '';
// 通过 ASE 对称解密
const _password = Cookies.get('password') ? CryptoJS.AES.decrypt(Cookies.get('password'), passwordKey).toString(CryptoJS.enc.Utf8) : '';

// 表单项
const loginForm = reactive({
    // 进页面前对cookie进行判断
    account: _account,
    password: _password,
    remember: _password ? true : false,
});

const rules = {
    account: [{ required: true, pattern: '^[0-9]{11}$', message: '请输入长度为11位的账户' }],
    password: [{ required: true, pattern: '^[a-zA-Z0-9]{6,15}$', message: '请输入长度为6-15位的密码' }],
};

// 登录提交
const onFinish = async values => {
    // 通过 ASE 对称加密保存在本地
    const tempPassword = CryptoJS.AES.encrypt(loginForm.password, passwordKey).toString();

    if (values.remember) {
        Cookies.set('account', loginForm.account);
        Cookies.set('password', tempPassword, {
            expires: 7, // 1天过期
        });
    } else {
        Cookies.remove('password');
    }
    const res = await loginService.goLogin({
        account: loginForm.account,
        password: md5(`${loginForm.password}@${passwordKey}`),
    });
    console.log(res);
};
</script>
<style lang="scss" src="./Login.scss" scoped></style>
