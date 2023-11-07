<template>
    <div class="logo">
        <img src="@/assets/logo.png" />
    </div>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="handleClick"
    >
        <a-sub-menu key="/teams">
            <template #title>
                <span>
                    <TeamOutlined />
                    <span>我的团队</span>
                </span>
            </template>
            <a-menu-item key="/teams">个人空间</a-menu-item>
            <a-menu-item key="/teams:id">新建团队</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/apihub">
            <CompassOutlined />
            <span>API Hub</span>
        </a-menu-item>
        <a-menu-item key="/collectionProject">
            <StarOutlined />
            <span>我的收藏</span>
        </a-menu-item>
        <a-menu-item key="/visitedProject">
            <HistoryOutlined />
            <span>最近访问</span>
        </a-menu-item>
    </a-menu>
</template>
<script setup>
// Components
import router from '@/router';
import { TeamOutlined, StarOutlined, CompassOutlined, HistoryOutlined } from '@ant-design/icons-vue';

// Dependenices
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Propertites
const route = useRoute();
const selectedKeys = ref(['/apihub']);

// Hooks
onBeforeMount(() => {
    selectedKeys.value[0] = route.fullPath;
});

// Methods
const handleClick = ({ key }) => {
    console.log(key);
    router.push(key);
};
</script>

<style lang="scss" src="./SideMenu.scss" scoped></style>
