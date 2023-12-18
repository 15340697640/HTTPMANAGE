import service from '@/utils/axios.config';
const teamService = {
    // 新增团队
    addTeam: async data => {
        return await service.post('/api/team/addTeam', data);
    },
    // 请求团队列表
    getTeams: async data => {
        return await service.get('/api/team/getTeams', {
            params: { email: data },
        });
    },
    // 请求团队项目
    getTeamProjects: async data => {
        return await service.get('/api/team/getTeamProjects', {
            params: { teamId: data },
        });
    },
    // 删除团队
};

export default teamService;
