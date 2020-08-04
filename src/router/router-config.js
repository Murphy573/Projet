import Dashboard from './modules/dashboard';
import eg from './modules/eg';
import Base from './modules/base';
import projet from './modules/projet';

/**
* meta : {
    permissions: ['GET /aaa','POST /bbb']   权限列表，如果不设置，则视为不需要权限
    title: 'title'                    i18n的navigation下的key：用于tag的标题
    cached: 'ComponentName'           控制页面缓存，值为路由组件name,不定义则不缓存
    menuMapper: 'routername'          映射的菜单name，激活菜单选中
    breadcrumb： 'breadcrumb'         面包屑i18n对应的属性码，不定义则不生成面包屑
    forbiddenJump: true               则该路由不能跳转并且面包屑不能点击，一般用在父路由上
    isWhiteList: true                 白名单，该路由是否绕过权限和登录验证
    affix: true                       将tag始终固定在tagbar上，不能关闭
  }
  redirect: {} 父路由建议配置：配置该属性可以提升用户体验（当在浏览器地址栏输入父路由的地址，可以自动重定向到任意路由，即使重定向后的路由没有权限，系统也会给出提示）
**/
export default [
  ...Base,
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '/redirect',
        name: 'redirect',
        component: () => import('@/views/redirect/index'),
        meta: {
          showTag: false
        }
      },
      Dashboard,
      eg,
      projet
    ]
  },
  {
    path: '*',
    redirect: { name: 'login', replace: true }
  }
];
