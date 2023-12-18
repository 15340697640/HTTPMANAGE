import service from '@/utils/axios.config';

const projectService = {
    // 收藏项目
    collectProject: async (projectId, isCollected) => {
        return await service.post(`/api/project/isCollect`, {
            projectId,
            isCollected,
        });
    },
};

export default projectService;
