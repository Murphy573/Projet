/**
 * 菜单配置：
 * name：作为菜单点击跳转路由的name
 * meta: {
 *  icon: 菜单图标, svg name
 *  title: 菜单对应的i18n的navigation下的key
 *  permissions: 权限码字符串数组；如果不设置，则视为不需要权限验证
 *  affix：将tag始终固定在tagbar上，不能关闭，请在对应的router配置文件中同样配置此属性，因为当切换tag此时会根据路由配置更新tag对象（不要配置在含有children的父路由上，不起作用）
 * }
 */
export default [
  {
    name: 'dashboard',
    meta: {
      icon: 'dashboard',
      affix: true,
      title: 'dashboard'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'projet',
    meta: {
      icon: 'dashboard',
      title: 'projet'
    }
  },
  {
    name: 'eg',
    meta: {
      icon: 'chart',
      title: 'eg'
    },
    children: [
      {
        name: 'eg1',
        meta: {
          title: 'eg1',
          permissions: ['CODE2']
        }
      },
      {
        name: 'eg2',
        meta: {
          title: 'eg2',
          permissions: ['CODE1', 'CODE2']
        }
      },
      {
        name: 'eg3',
        meta: {
          title: 'eg3'
        },
        children: [
          {
            name: 'eg33',
            meta: {
              title: 'eg33',
              permissions: ['CODE1']
            }
          }
        ]
      },
      {
        name: 'eg4',
        meta: {
          title: 'eg4'
        }
      }
    ]
  }
];
