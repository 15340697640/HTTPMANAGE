import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useTeamStore = defineStore('teamStore', () => {
    const teamItems = reactive([]);

    return { teamItems };
});
