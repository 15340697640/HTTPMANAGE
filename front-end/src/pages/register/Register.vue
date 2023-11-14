<template>
    <a-steps :items="items"></a-steps>
    <!-- 个人信息填写 -->
    <div v-if="step === 1">
        <a-form
            ref="formRef"
            name="register-form"
            :model="formState"
            :rules="rules"
            v-bind="layout"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item
                has-feedback
                label="帐号"
                name="account"
            >
                <a-input v-model:value="formState.account" />
            </a-form-item>
            <a-form-item
                has-feedback
                label="密码"
                name="password"
            >
                <a-input
                    v-model:value="formState.password"
                    type="password"
                />
            </a-form-item>
            <a-form-item
                has-feedback
                label="昵称"
                name="nickName"
            >
                <a-input v-model:value="formState.nickName" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                <a-button
                    type="primary"
                    html-type="submit"
                >
                    下一步
                </a-button>
            </a-form-item>
        </a-form>
    </div>
    <!-- 邮箱验证 -->
    <div v-else-if="step === 2">
        <a-form
            ref="formRef"
            name="register-form"
            :model="formState"
            :rules="rules"
            v-bind="layout"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item
                has-feedback
                label="邮箱"
                name="email"
            >
                <a-input v-model:value="formState.email" />
            </a-form-item>
            <a-form-item
                label="验证码"
                name="captcha"
                :wrapper-col="{ span: 3 }"
                style="display: flex"
            >
                <a-input-group compact>
                    <a-input
                        v-model:value="formState.captcha"
                        style="width: calc(100% - 50px)"
                    />
                    <a-button
                        @click="sendCodeHandle"
                        :disabled="isdisable"
                        >{{ promptMessage }}</a-button
                    >
                </a-input-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button @click="backStepHandle">上一步</a-button>
                <a-button
                    type="primary"
                    html-type="submit"
                    style="margin-left: 10px"
                    >提交</a-button
                >
            </a-form-item>
        </a-form>
    </div>
    <!-- 完成界面提示 -->
    <div v-else>
        <a-result
            status="success"
            title="恭喜小主,您已经完成注册!"
        >
            <template #extra>
                <a-button
                    key="console"
                    type="primary"
                    @click="router.push('/login')"
                    >跳转到登录界面</a-button
                >
            </template>
        </a-result>
    </div>
</template>
<script setup>
// Components
import { UserOutlined, SolutionOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// Dependencies
import { reactive, ref, h, computed } from 'vue';
import md5 from 'blueimp-md5';
import { passwordKey } from '@/assets/config';
import { useCountDown } from '@/utils/hooks';
import loginService from '@/api/login';
import router from '@/router';

// 倒计时
const { start, timer } = useCountDown();

// 表单相关
const formRef = ref();
const formState = reactive({
    account: '',
    password: '',
    nickName: '',
    email: '',
    captcha: '',
});

// 校验规则
const rules = {
    account: [
        { required: true, message: '请输入长度为6-11位的账户' },
        { whitespace: true, min: 5, max: 11 },
    ],
    password: [
        { required: true, message: '请输入长度为6-15位的密码' },
        { whitespace: true, min: 6, max: 15 },
    ],
    nickName: [
        { required: true, message: '请输入您的昵称' },
        { whitespace: true, min: 1, max: 11 },
    ],
    email: [
        { required: true, message: '请输入正确的邮箱' },
        { whitespace: true, type: 'email' },
    ],
    captcha: [{ required: true, message: '请输入验证码' }],
};

// 表单布局
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 5,
    },
};

// 步骤条
const step = ref(1);
const items = ref([
    {
        title: '个人信息',
        status: 'finish',
        icon: h(UserOutlined),
    },
    {
        title: '验证',
        status: 'wait',
        icon: h(SolutionOutlined),
    },
    {
        title: '完成',
        status: 'wait',
        icon: h(CheckCircleOutlined),
    },
]);

// 提交表单校验成功
const handleFinish = async values => {
    if (step.value === 2) {
        await loginService.goRegister({
            account: formState.account,
            password: md5(`${formState.password}@${passwordKey}`),
            nickName: formState.nickName,
            email: formState.email,
            captcha: formState.captcha,
        });
    }
    nextStepHandle();
};

// 提交表单校验失败
const handleFinishFailed = errors => {
    console.log(errors);
    message.error('表单项不能为空');
};

// 进度切换
const nextStepHandle = () => {
    items.value[step.value].status = 'finish';
    step.value = step.value + 1;
};

const backStepHandle = () => {
    step.value = step.value - 1;
    items.value[step.value].status = 'wait';
};

// 发送验证码请求
const sendCodeHandle = async () => {
    formRef.value
        .validateFields(['email'])
        // 确保邮箱已经填写
        .then(async ({ email }) => {
            start(60);
            const res = await loginService.getCaptcha(email);
        })
        .catch(err => {
            console.log('err', err);
        });
};

// Computed
const isdisable = computed(() => {
    return timer.value === 0 ? false : true;
});
const promptMessage = computed(() => {
    return timer.value === 0 ? '发送请求' : `${timer.value}s后再发送`;
});
</script>

<style lang="scss" src="./Register.scss" scoped></style>
