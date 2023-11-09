<template>
    <a-layout class="Layout-box">
        <a-layout-sider
            v-model:collapsed="collapsed"
            collapsible
        >
            <SideMenu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <TopHeader />
            </a-layout-header>

            <a-layout-content>
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
// Components
import SideMenu from '@/components/side-menu/SideMenu.vue';
import TopHeader from '@/components/top-header/TopHeader.vue';

// Dependencies
import { ref } from 'vue';
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
const collapsed = ref(false);
</script>
<style lang="scss" src="./Home.scss" scoped></style>
