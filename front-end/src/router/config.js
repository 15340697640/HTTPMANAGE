// import Teams from '@/pages/home/teams/Teams.vue';
// import CollectionProject from '@/pages/home/collection-project/CollectionProject.vue';
// import ApiHub from '@/pages/home/apihub/ApiHub.vue';
// import VisitedProject from '@/pages/home/visited-project/VisitedProject.vue';
// import NotFound from '@/pages/not-found/NotFound.vue';

const Teams = () => import('@/pages/home/teams/Teams.vue');
const CollectionProject = () => import('@/pages/home/collection-project/CollectionProject.vue');
const ApiHub = () => import('@/pages/home/apihub/ApiHub.vue');
const VisitedProject = () => import('@/pages/home/visited-project/VisitedProject.vue');

const routes = [
    {
        path: '/teams',
        component: Teams,
    },
    {
        path: '/collectionProject',
        component: CollectionProject,
    },
    {
        path: '/apiHub',
        component: ApiHub,
    },
    {
        path: '/visitedProject',
        component: VisitedProject,
    },
];
export default routes;
