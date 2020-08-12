## 🏠Projet

## Projet 是什么

Projet 是一个`在线生成 H5 页面并提供页面管理和页面编辑的平台`，用于快速制作 H5 页面区块。用户无需掌握复杂的编程技术，通过简单配置即可制作精美的页面，可用于营销场景下的页面区块制作。同时，也为开发者提供了`编程接入能力`

## 支持功能

- [x] 基础组件
- [x] 复合组件
- [x] 容器组件嵌套
- [x] 实时预览
- [x] 样式编辑
- [ ] 组件保存
- [ ] 模版保存

## 技术栈

`vue`: 组件化开发<br/>
`vuex`: 数据状态管理<br/>
`sass`: css 预编译器。<br/>
`element-ui`：vue 后台管理常用的 UI 组件库<br/>
`vant`：移动端 UI 组件库<br/>

## 目录结构

```
|-- projet                                    --------主目录
    |-- layout                                --------界面布局
        |-- content                           --------界面下方
            |-- center                        --------可视区
                |-- index.vue
            |-- left                          --------左侧面板
                |-- components
                    |-- component-libs.vue    --------组件面板
                    |-- layer-management.vue  --------图层管理面板
                    |-- templates-libs.vue    --------模版面板
                |-- index.vue
            |-- right                         --------右侧面板
                |-- css-editor                --------样式编辑
                |-- props-editor              --------属性编辑
                |-- shortcut-menu             --------快捷操作编辑
                |-- index.vue
            |-- index.vue
        |-- header                            --------界面上方
            |-- index.vue
        |-- index.vue
    |-- model                                 --------数据格式化
        |-- attr.editor.js                    --------编辑器props支持的属性编辑组件
        |-- create-component.js               --------创建组件，添加公共属性
        |-- css.js                            --------公共样式
        |-- element.js                        --------基础组件渲染相关
        |-- page.js                           --------根页面组件渲染
    |-- resource                              --------组件资源目录
        |-- basic                             --------基础组件目录
        |-- complex                           --------复合组件目录（.json）
        |-- register.js                       --------组件注册
    |-- store                                 --------数据处理中心
        |-- namespaced.js                     --------命名空间
        |-- projet.js                         --------数据处理、交互的文件
    |-- utils                                 --------工具目录
        |-- common.js                         --------公共工具
        |-- element.js                        --------元素相关
        |-- history.js                        --------历史记录
        |-- z-index.js                        --------层叠z-index
```

```
npm i
```

### Compiles and hot-reloads for development

```
npm run start
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
