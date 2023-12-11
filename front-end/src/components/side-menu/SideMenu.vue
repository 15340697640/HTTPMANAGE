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
            style="margin-bottom: 24px"
        />
        <a-textarea
            v-model:value="teamDiscription"
            placeholder="团队描述"
            :rows="4"
        />
    </a-modal>
</template>
<script setup>
// Components
import router from '@/router';
import { TeamOutlined, StarOutlined, CompassOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons-vue';

// Dependenices
import { ref, onBeforeMount, reactive, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

// Propertites
const route = useRoute();
const selectedKeys = ref([]);
const openKeys = ref(['/home/teams']);

const open = ref(false);
const confirmLoading = ref(false);

const teamName = ref('');
const teamDiscription = ref('');
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
    getItem('我的团队', '我的团队', '/home/teams', () => h(TeamOutlined), [getItem('新建团队', null, 'createTeam', () => h(PlusOutlined))]),
    getItem('API HUB', null, '/home/apiHub', () => h(CompassOutlined)),
    getItem('我的收藏', null, '/home/collectionProject', () => h(StarOutlined)),
    getItem('最近访问', null, '/home/visitedProject', () => h(HistoryOutlined)),
]);

const handleClick = ({ item, key }) => {
    if (key === 'createTeam') {
        showModal();
    } else router.push(key);
};

// create new team
const showModal = () => {
    open.value = true;
};
const handleOk = async () => {
    confirmLoading.value = true;
    open.value = false;
    confirmLoading.value = false;
    // Push the element just created before the last element of the array
    // 将刚才创建的元素推入数组最后一个元素之前
    const target = items[0].children.length - 1;
    const pathId = uuidv4().toString().replace(/\D/g, '').slice(0, 8);
    items[0].children.splice(target, 0, getItem(teamName.value, teamName.value, `/home/teams/${pathId}`));
    router.push(`/home/teams/${pathId}`);
    selectedKeys.value[0] = `/home/teams/${pathId}`;
};
</script>

<style lang="scss" src="./SideMenu.scss" scoped></style>
