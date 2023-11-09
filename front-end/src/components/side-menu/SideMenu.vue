<template>
    <div class="logo">
        <img src="@/assets/logo.png" />
    </div>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        :items="items"
        mode="inline"
        @click="handleClick"
        :style="{ fontSize: '16px' }"
    >
    </a-menu>
</template>
<script setup>
// Components
import router from '@/router';
import { TeamOutlined, StarOutlined, CompassOutlined, HistoryOutlined } from '@ant-design/icons-vue';

// Dependenices
import { ref, onBeforeMount, reactive, h, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Propertites
const route = useRoute();
const selectedKeys = ref(['/apihub']);
const openKeys = ref(['/teams']);

// Hooks
onBeforeMount(() => {
    selectedKeys.value[0] = route.fullPath;
});

// Methods
const getItem = (label, key, icon, children) => {
    return { label, key, icon, children };
};
const items = reactive([
    getItem('我的团队', '/teams', () => h(TeamOutlined), [getItem('个人空间', '/teams'), getItem('新建团队', '/teams/:id')]),
    getItem('API HUB', '/apiHUb', () => h(CompassOutlined)),
    getItem('我的收藏', '/collectionProject', () => h(StarOutlined)),
    getItem('最近访问', '/visitedProject', () => h(HistoryOutlined)),
]);

const handleClick = ({ key }) => {
    router.push(key);
};
</script>

<style lang="scss" src="./SideMenu.scss" scoped></style>
