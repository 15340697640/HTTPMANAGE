import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTeamStore = defineStore('teamStore', () => {
    const teamList = ref([]);
    const addTeamList = value => {
        teamList.value = [...teamList.value, ...value];
    };
    return { teamList, addTeamList };
});
