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
import { TeamOutlined, StarOutlined, CompassOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons-vue';

// Dependenices
import router from '@/router';
import { ref, onMounted, reactive, h } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import api from '@/api/index';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useTeamStore } from '@/store/teamStore';

// Propertites
const userInfoStore = useUserInfoStore();
const teamStore = useTeamStore();
const route = useRoute();
const selectedKeys = ref([]);
const openKeys = ref(['/home/teams']);

const open = ref(false);
const confirmLoading = ref(false);

const teamName = ref('');
const teamDiscription = ref('');

// Methods
/**
 * 处理团队列表的渲染显示
 * @param {string} label
 * @param {string} title
 * @param {string} key
 * @param {Function} icon - callback function
 * @param {Array} children - children array
 */
const getItem = (label, title, key, icon, children) => {
    return { label, title, key, icon, children };
};
/**
 * 为团队列表添加元素，确保新加入的元素都在“新建团队”按钮之前
 * @param {*} title
 * @param {*} key
 */
const pushItem = (label, title, teamId) => {
    // 获取最后一个元素(新建团队)
    const target = items[0].children.length - 1;
    items[0].children.splice(target, 0, getItem(label, title, `/home/teams/${teamId}`));
};
const items = reactive([
    getItem('我的团队', '我的团队', '/home/teams', () => h(TeamOutlined), [getItem('新建团队', null, 'createTeam', () => h(PlusOutlined))]),
    getItem('API HUB', null, '/home/apiHub', () => h(CompassOutlined)),
    getItem('我的收藏', null, '/home/collectionProject', () => h(StarOutlined)),
    getItem('最近访问', null, '/home/visitedProject', () => h(HistoryOutlined)),
]);

/**
 * 获取团队列表
 */
const getTeams = async () => {
    const { data } = await api.teamService.getTeams(userInfoStore.userInfo.email);
    teamStore.addTeamList(data);
    teamStore.teamList.forEach(team => {
        // 确保不插入重复的元素
        if (!items[0].children.some(item => item.key === `/home/teams/${team.team_id}`)) {
            pushItem(team.team_name, team.team_name, team.team_id);
        }
    });
};
getTeams();

/**
 * 处理团队列表的点击事件，跳入对应的团队页面，除了新建团队
 */
const handleClick = ({ key }) => {
    if (key === 'createTeam') {
        showModal();
    } else {
        if (key.includes('/home/teams')) {
            router.push({ path: key, query: { tab: 'project' } });
        } else {
            router.push({ path: key });
        }
    }
};

/**
 * 新建团队对话框的显示
 */
const showModal = () => {
    open.value = true;
};
/**
 * 新建团队等待加载的动画显示
 */
const showConfirmLoading = value => {
    confirmLoading.value = true;
};
/**
 * 新建团队对话框的确认按钮的点击事件
 */
const handleOk = async () => {
    const teamId = uuidv4().toString().replace(/\D/g, '').slice(0, 8);
    showConfirmLoading(true);
    await api.teamService.addTeam({
        teamName: teamName.value,
        description: teamDiscription.value,
        teamId: teamId,
        ownerEmail: userInfoStore.userInfo.email,
    });
    open.value = false;
    showConfirmLoading(false);
    // Push the element just created before the last element of the array
    pushItem(teamName.value, teamName.value, teamId);
    selectedKeys.value[0] = `/home/teams/${teamId}`;
    router.push({ path: `/home/teams/${teamId}`, query: { tab: 'project' } });
};

// Hooks
onMounted(() => {
    selectedKeys.value[0] = route.fullPath.split('?')[0];
});
</script>

<style lang="scss" src="./SideMenu.scss" scoped></style>
