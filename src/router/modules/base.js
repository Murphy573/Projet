export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      isWhiteList: true
    }
  }
];
