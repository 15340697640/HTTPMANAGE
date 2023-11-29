<template>
    <div class="title-box">个人空间</div>
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
import { h, ref } from 'vue';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue';
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
</script>
<style lang="scss" src="./Teams.scss" scoped></style>
