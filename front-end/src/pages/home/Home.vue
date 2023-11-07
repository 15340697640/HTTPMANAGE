<template>
    <a-layout>
        <a-layout-sider
            v-model:collapsed="collapsed"
            collapsible
        >
            <SideMenu />
        </a-layout-sider>
        <a-layout>
            <TopHeader />
            <router-view />
        </a-layout>
    </a-layout>
</template>
<script setup>
// Components
import SideMenu from '@/components/side-menu/SideMenu.vue';
import TopHeader from '@/components/top-header/TopHeader.vue';

// Dependencies
import { ref } from 'vue';

const collapsed = ref(false);
</script>
<style lang="scss" src="./Home.scss" scoped></style>
