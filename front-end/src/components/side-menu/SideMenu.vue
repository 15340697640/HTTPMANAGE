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
    <a-modal
        v-model:open="open"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
    >
        <h1 style="text-align: center; margin-bottom: 32px">新建团队</h1>
        <a-input
            v-model:value="teamName"
            placeholder="团队名称"
        />
    </a-modal>
</template>
<script setup>
// Components
import router from '@/router';
import { TeamOutlined, StarOutlined, CompassOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons-vue';

// Dependenices
import { ref, onBeforeMount, reactive, h, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Propertites
const route = useRoute();
const selectedKeys = ref(['/apihub']);
const openKeys = ref(['/teams']);

const open = ref(false);
const confirmLoading = ref(false);

const teamName = ref('');
// Hooks
onBeforeMount(() => {
    selectedKeys.value[0] = route.fullPath;
    console.log(route.fullPath);
});

// Methods
const getItem = (label, title, key, icon, children) => {
    return { label, title, key, icon, children };
};
const items = reactive([
    getItem('我的团队', '我的团队', '/home/teams', () => h(TeamOutlined), [
        getItem('个人空间', '个人空间', '/home/teams'),
        getItem('芜湖栽', '芜湖栽', '/home/teams/123123'),
        getItem('新建团队', null, 'createTeam', () => h(PlusOutlined)),
    ]),
    getItem('API HUB', null, '/home/apiHub', () => h(CompassOutlined)),
    getItem('我的收藏', null, '/home/collectionProject', () => h(StarOutlined)),
    getItem('最近访问', null, '/home/visitedProject', () => h(HistoryOutlined)),
]);

const handleClick = ({ item, key }) => {
    if (key === 'createTeam') {
        showModal();
    } else router.push(key);
};

const showModal = () => {
    open.value = true;
};
const handleOk = () => {
    confirmLoading.value = true;
    setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
        // Push the element just created before the last element of the array
        // 将刚才创建的元素推入数组最后一个元素之前
        const target = items[0].children.length - 1;
        items[0].children.splice(target, 0, getItem(teamName.value, teamName.value, '/home/teams/456456'));
    }, 100);
};
</script>

<style lang="scss" src="./SideMenu.scss" scoped></style>
