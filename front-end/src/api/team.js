import service from '@/utils/axios.config';
const teamService = {
    // 新增团队
    addTeam: async data => {
        return await service.post('/api/team/addTeam', data);
    },
    // 请求团队列表
    getTeams: async data => {
        return await service.get('/api/team/getTeams', {
            params: { data },
        });
    },
    // 请求团队信息
    getTeamInfo: async data => {
        return await service.get('/api/team/getTeamInfo', {
            params: { data },
        });
    },
    // 删除团队
};

export default teamService;
