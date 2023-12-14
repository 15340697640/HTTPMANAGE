import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserInfoStore = defineStore(
    'userInfoStore',
    () => {
        const userInfo = ref({});
        const changeUserInfo = value => {
            userInfo.value = { ...userInfo.value, ...value };
        };

        return {
            userInfo,
            changeUserInfo,
        };
    },
    {
        persist: true,
    }
);
