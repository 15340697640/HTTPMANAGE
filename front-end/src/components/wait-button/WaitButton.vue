<template>
    <a-button
        :disabled="isdisable"
        @click="sendCode"
        >{{ promptMessage }}</a-button
    >
</template>
<script setup>
// Depencies
import { computed, ref, watch } from 'vue';
import { useIntervalFn } from '@vueuse/core';

const props = defineProps({
    'wait-time': Number,
});

const waitTime = ref(props.waitTime);

console.log(props.emailAddress);
// 倒计时
const timer = ref(0);
// 发送验证码倒计时
// useIntervalFn(定时的回调，回调的时间间隔，控制回调的调用方式)
// 参数三 {immediate: true, immediateCallback: false}
// 3-1) immediate 首次运行useIntervalFn函数时，是否立刻开启定时任务（默认值true表示默认开启）
// 3-2）immediateCallback 执行useIntervalFn函数立刻执行回调（在延时时间的前或者后调用），默认值是false，如果修改为true，表示为不延时，立刻启动定时任务（不要使用pause方法）
// pause暂停；resume启动
const { pause, resume } = useIntervalFn(
    () => {
        if (timer.value <= 0) {
            // 停止定时任务
            pause();
        } else {
            // 单次定时任务执行的回调
            timer.value--;
        }
    },
    1000,
    {
        // 默认不开启定时任务
        immediate: false,
    }
);

// 发送验证码
const sendCode = async () => {
    // 开启倒计时效果
    if (timer.value === 0) {
        timer.value = waitTime.value;
        resume();
    } else {
        return;
    }
};

const isdisable = computed(() => {
    return timer.value === 0 ? false : true;
});
const promptMessage = computed(() => {
    return timer.value === 0 ? '发送验证码' : `${timer.value}s后重新获取`;
});
</script>
<style lang="scss" src="./WaitButton.scss" scoped></style>
