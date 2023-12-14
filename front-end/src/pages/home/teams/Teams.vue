<template>
    <div class="title-box">{{ title }}</div>
    <div class="control-box">
        <div class="nav-box">
            <a-menu
                v-model:selectedKeys="current"
                mode="horizontal"
                :items="items"
            />
        </div>
        <div>
            <a-input-search
                placeholder="搜索"
                style="width: 200px"
            />
            <a-button :icon="h(DownloadOutlined)">导入项目</a-button>
            <a-button :icon="h(PlusOutlined)"> 新建项目</a-button>
        </div>
    </div>
    <router-view></router-view>
</template>
<script setup>
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue';

// Dependencies
import { h, ref, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useTeamStore } from '@/store/teamStore';

const teamStore = useTeamStore();
const route = useRoute();
const title = ref('');
const current = ref(['mail']);
const items = ref([
    {
        key: 'mail',
        label: '团队项目',
    },
    {
        key: 'app',
        label: '成员/权限',
    },
    {
        key: 'sub1',
        label: '团队设置',
    },
]);

const getTeamInfo = async () => {
    const teamId = +route.params.id;
    const team = await getTeamInfo(teamId);
    console.log(team);
};

// Hooks
onBeforeRouteUpdate((to, from) => {
    console.log(to.fullPath, from.fullPath);
    title.value = to.fullPath;
});
onMounted(() => {});
</script>
<style lang="scss" src="./Teams.scss" scoped></style>
