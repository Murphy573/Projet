## 🏠Projet

### 介绍

Projet 是一个`在线生成 H5 页面并提供页面管理和页面编辑的平台`，用于快速制作 H5 页面。

_图为编辑器工作区界面_
![工作台](http://pic3.pocoimg.cn/image/poco/works/76/2020/0812/17/15972257783390255_201481929.jpg?imageMogr2/auto-orient/thumbnail/x800/blur/1x0/quality/100&)

_若图片加载不出来请查看`src/assets/md-images/projet-main.jpg`_

### 支持功能

- [x] 基础组件
- [x] 复合组件
- [x] 容器组件嵌套
- [x] 实时预览
- [x] 样式编辑
- [x] 快捷操作：撤销、反撤销、复制、粘贴、前移、后移、删除
- [ ] 组件保存
- [ ] 模版保存

### 技术栈

`vue`: 组件化开发<br/>
`vuex`: 数据状态管理<br/>
`sass`: css 预编译器<br/>
`element-ui`：vue 后台管理常用的 UI 组件库<br/>
`vant`：移动端 UI 组件库<br/>

### 目录结构

```
|-- src/views/projet                          --------主目录
    |-- layout                                --------界面布局
        |-- content                           --------界面下方
            |-- center                        --------可视区
                |-- index.vue
            |-- left                          --------左侧面板
                |-- components
                    |-- component-libs.vue    --------可选组件面板
                    |-- layer-management.vue  --------图层管理面板
                    |-- templates-libs.vue    --------模版管理面板
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

### 上手使用

```bash
# 克隆代码
git clone https://github.com/Murphy573/Projet.git
# npm安装依赖
npm i
# 启动工程
npm run start
```

### 相关链接

- [演示地址](https://murphy573.github.io/Projet/#/login)
- [设计思路](https://github.com/Murphy573/Projet/wiki/%E8%AE%BE%E8%AE%A1%E6%80%9D%E8%B7%AF)
- [组件开发](https://github.com/Murphy573/Projet/wiki/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91)

### License

[MIT](http://opensource.org/licenses/MIT)

<p style="font-size:18px;" align="center">👉 `来都来了，点个 Star⭐️ 支持一下吧` 👈</p>
