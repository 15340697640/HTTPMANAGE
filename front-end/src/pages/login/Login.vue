<template>
    <div class="login-box">
        <a-form
            :model="loginForm"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            :rules="rules"
        >
            <!-- 账户 -->
            <a-form-item
                label="Account"
                name="account"
            >
                <a-input v-model:value="loginForm.account" />
            </a-form-item>

            <!-- 密码 -->
            <a-form-item
                label="Password"
                name="password"
            >
                <a-input-password v-model:value="loginForm.password" />
            </a-form-item>

            <!-- 记住账户密码 -->
            <a-form-item
                name="remember"
                :wrapper-col="{ offset: 8, span: 16 }"
            >
                <a-checkbox v-model:checked="loginForm.remember">Remember me</a-checkbox>
            </a-form-item>

            <!-- 记住账户密码 -->
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button
                    type="primary"
                    html-type="submit"
                    >Submit</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
// Dependencies
import { reactive } from 'vue';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import loginService from '@/api/login';

// const loginFormRef = ref();
const loginForm = reactive({
    // 进页面前对cookie进行判断
    account: Cookies.get('account') ? CryptoJS.AES.decrypt(Cookies.get('account'), '蜜雪冰城甜蜜蜜').toString(CryptoJS.enc.Utf8) : '',
    password: Cookies.get('password') ? CryptoJS.AES.decrypt(Cookies.get('password'), '蜜雪冰城甜蜜蜜').toString(CryptoJS.enc.Utf8) : '',
    remember: Cookies.get('password') ? true : false,
});

const rules = {
    account: [{ required: true, pattern: '^[0-9]{11}$', message: '请输入长度为11位的账户' }],
    password: [{ required: true, pattern: '^[a-zA-Z0-9]{6,15}$', message: '请输入长度为6-15位的密码' }],
};

// 登录提交
const onFinish = async values => {
    if (values.remember) {
        Cookies.set('account', CryptoJS.AES.encrypt(loginForm.account, '蜜雪冰城甜蜜蜜'), {
            expires: 1, // 1天过期
        });
        Cookies.set('password', CryptoJS.AES.encrypt(loginForm.password, '蜜雪冰城甜蜜蜜'), {
            expires: 1, // 1天过期
        });
    } else {
        Cookies.remove('account'), Cookies.remove('password');
    }

    const res = await loginService.goLogin(loginForm.account, loginForm.password);
    console.log(res);
};
</script>
<style lang="scss" src="./Login.scss" scoped></style>
