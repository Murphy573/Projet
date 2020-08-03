export default {
  path: 'dashboard',
  component: () => import('@/views/dashboard/index'),
  name: 'dashboard',
  meta: {
    menuMapper: 'dashboard',
    breadcrumb: 'dashboard',
    title: 'dashboard',
    affix: true
  }
};
