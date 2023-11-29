import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('loginStore', () => {
    const isLogin = ref(false);

    const changeLoginState = value => {
        isLogin.value = value;
    };
    return { isLogin, changeLoginState };
});
