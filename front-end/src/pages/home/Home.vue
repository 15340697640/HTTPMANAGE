<template>
    <a-layout class="Layout-box">
        <a-layout-sider>
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
</script>
<style lang="scss" src="./Home.scss" scoped></style>
