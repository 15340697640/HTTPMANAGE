<template>
    <div class="header-box">
        <div class="title-box">{{ title }}</div>
        <div class="tag-box">
            <span>{{ role }}</span>
        </div>
    </div>

    <div class="control-box">
        <div class="nav-box">
            <a-menu
                v-model:selectedKeys="current"
                mode="horizontal"
                :items="items"
                @click="changeTab"
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
    <ProjectControl v-if="current[0] === 'project'" />
    <MemberControl v-else-if="current[0] === 'member'" />
    <TeamSetting v-else="current[0] === 'setting'" />
</template>
<script setup>
// Components
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import ProjectControl from '@/pages/home/teams/project-control/ProjectControl.vue';
import MemberControl from '@/pages/home/teams/member-control/MemberControl.vue';
import TeamSetting from '@/pages/home/teams/team-setting/TeamSetting.vue';

// Dependencies
import { h, ref, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useTeamStore } from '@/store/teamStore';
import api from '@/api/index';
import router from '@/router';

const teamStore = useTeamStore();
const route = useRoute();
const title = ref('');
const discription = ref('');
const role = ref('');
const current = ref([route.query.tab]);
const items = ref([
    {
        key: 'project',
        label: '团队项目',
    },
    {
        key: 'member',
        label: '成员/权限',
    },
    {
        key: 'setting',
        label: '团队设置',
    },
]);

/**
 * 获取团队信息(名称，在当前团队的角色，团队描述)完成渲染
 * @param {string} teamId 团队id
 */
const getTeamInfo = teamId => {
    const team = teamStore.teamList.find(team => team.team_id == teamId);
    if (!team) return;
    title.value = team.team_name;
    // discription.value = team.team_description;
    switch (team.member_role) {
        case 0:
            role.value = '团队拥有者';
            break;
        case 1:
            role.value = '团队管理员';
            break;
        case 2:
            role.value = '团队成员';
            break;
    }
};

const getTeamProjects = async teamId => {
    const projectLists = await api.teamService.getTeamProjects(teamId);
    // const projects = team.projects;
    // projects.forEach(project => {
    //     project.members.forEach(member => {
    //         member.avatar = member.avatar || '/images/avatar.png';
    console.log(projectLists);
};

/**
 * 切换tab
 */
const changeTab = ({ key }) => {
    router.push({
        query: {
            tab: key,
        },
    });
};
// Hooks
/**
 * 监听路由变化，获取团队信息
 */
onBeforeRouteUpdate((to, from) => {
    getTeamInfo(to.params.id);
    // getTeamProjects(to.params.id);
});
onMounted(() => {
    getTeamInfo(route.params.id);
    // getTeamProjects(route.params.id);
});
</script>
<style lang="scss" src="./Teams.scss" scoped></style>
