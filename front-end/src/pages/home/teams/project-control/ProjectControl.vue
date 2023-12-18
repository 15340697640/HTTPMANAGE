<template>
    <div class="container-box">
        <a-card
            v-for="(item, index) in projectList"
            style="width: 300px"
            class="card-box"
        >
            <div class="title-box">
                <span>{{ item.projectName }}</span>
                <div class="icons-box">
                    <StarFilled
                        v-if="item.isCollected"
                        style="color: orange"
                        @click="handleCollectClick(index)"
                    />
                    <StarOutlined
                        v-else
                        class="icon-item"
                        @click="handleCollectClick(index)"
                    />

                    <a-dropdown class="icon-item">
                        <a
                            class="ant-dropdown-link"
                            @click.prevent
                        >
                            <UnorderedListOutlined />
                        </a>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="modify"> 修改信息 </a-menu-item>
                                <a-menu-item key="move"> 移动项目 </a-menu-item>
                                <a-menu-item key="delete"> 删除项目 </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>

            <!-- <h4>{{ item.projectName }}</h4> -->
            <!-- <p>{{ item.projectDescription }}</p> -->
            <div class="discription-box">{{ item.projectDescription }}</div>
            <span class="time-box">创建时间：{{ item.projectCreateTime }}</span>
        </a-card>
    </div>
</template>
<script setup>
// Components
import { SmallDashOutlined, StarOutlined, UnorderedListOutlined, StarFilled } from '@ant-design/icons-vue';
// Dependencies
import api from '@/api';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import dayjs from 'dayjs';

const route = useRoute();
const projectList = ref([]);
// 是否开启路由变化监听
let flag = true;
//
const isCollected = ref(false);
/**
 * 获取团队的项目列表
 * @param {string} teamId 团队id
 */
const getTeamProjects = async teamId => {
    // 设置flag为false，取消路由变化监听，防止重复发送请求
    flag = false;
    const { data } = await api.teamService.getTeamProjects(teamId);
    projectList.value = data;
    projectList.value.forEach(item => {
        item.projectCreateTime = dayjs(item.projectCreateTime).format('YYYY-MM-DD');
    });
    // 重新开启路由变化监听
    flag = true;
};

/**
 * 点击收藏或取消收藏当前项目
 */
const handleCollectClick = async index => {
    projectList.value[index].isCollected = !projectList.value[index].isCollected;
    await api.projectService.collectProject(projectList.value[index].projectId, projectList.value[index].isCollected);
};

/**
 * 点击菜单项对项目进行操作
 */
const handleMenuClick = ({ key }) => {
    console.log(key);
};
onBeforeRouteUpdate(to => {
    // 如果此时组件是重新创建，则不执行
    if (!flag) return;
    getTeamProjects(to.params.id);
});
onMounted(() => {
    getTeamProjects(route.params.id);
});
</script>
<style lang="scss" src="./ProjectControl.scss" scoped></style>
