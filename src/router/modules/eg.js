/* 商场管理 */
import LayoutMain from '@/views/layout/components/main';

export default {
  path: 'eg',
  component: LayoutMain,
  name: 'eg',
  meta: {
    breadcrumb: 'eg',
    forbiddenJump: true,
    title: 'eg'
  },
  redirect: { name: 'eg1', replace: true },
  children: [
    {
      path: 'eg1',
      component: () => import('@/views/eg/eg1'),
      name: 'eg1',
      meta: {
        menuMapper: 'eg1',
        breadcrumb: 'eg1',
        title: 'eg1',
        permissions: ['CODE2']
      }
    },
    {
      path: 'eg2',
      component: () => import('@/views/eg/eg2'),
      name: 'eg2',
      meta: {
        permissions: ['CODE1', 'CODE2'],
        menuMapper: 'eg2',
        breadcrumb: 'eg2',
        title: 'eg2',
        cached: 'Eg2'
      }
    },
    {
      path: 'eg3',
      component: () => import('@/views/eg/eg3'),
      name: 'eg3',
      meta: {
        menuMapper: 'eg3',
        breadcrumb: 'eg3',
        title: 'eg3',
        forbiddenJump: true
      },
      redirect: { name: 'eg33', replace: true },
      children: [
        {
          path: 'eg33',
          component: () => import('@/views/eg/eg33/index'),
          name: 'eg33',
          meta: {
            menuMapper: 'eg33',
            breadcrumb: 'eg33',
            title: 'eg33',
            permissions: ['CODE1']
          }
        }
      ]
    },
    {
      path: 'eg4',
      component: () => import('@/views/eg/eg4'),
      name: 'eg4',
      meta: {
        breadcrumb: 'eg4',
        title: 'eg4'
      },
      redirect: { name: 'eg44', replace: true },
      children: [
        {
          path: 'list',
          component: () => import('@/views/eg/eg44/list'),
          name: 'eg44',
          meta: {
            menuMapper: 'eg4',
            title: 'eg4'
          }
        },
        {
          path: 'detail',
          component: () => import('@/views/eg/eg44/detail'),
          name: 'detail',
          meta: {
            menuMapper: 'eg4',
            breadcrumb: 'detail',
            title: 'detail'
          }
        }
      ]
    }
  ]
};
