export default {
  path: 'projet',
  component: () => import('@/views/projet/index'),
  name: 'projet',
  meta: {
    menuMapper: 'projet',
    breadcrumb: 'projet',
    title: 'projet'
  }
};
