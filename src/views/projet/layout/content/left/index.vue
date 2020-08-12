<template>
  <div class="layout-content-left">
    <el-tabs class="left"
      tab-position="left"
      v-model="activeSideBar"
      style="height: 100%;">
      <el-tab-pane v-for="(item, index) in sidebarMenus"
        :name="item.value"
        :key="index">
        <template #label>
          <el-tooltip class="item"
            effect="dark"
            :content="item.label"
            placement="right">
            <i class="iconfont"
              :class="item.iconfont"></i>
          </el-tooltip>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="right">
      <keep-alive>
        <component :is="activeSideBar"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ComponentsLibs from './components/component-libs';
import LayersManagement from './components/layers-management';
import TemplatesLibs from './components/templates-libs';

export default {
  name: 'LayoutContentLeft',

  components: { ComponentsLibs, LayersManagement, TemplatesLibs },

  data () {
    return {
      activeSideBar: 'ComponentsLibs',
      sidebarMenus: [
        {
          label: '组件库',
          value: 'ComponentsLibs',
          iconfont: 'iconzujian'
        },
        {
          label: '图层管理',
          value: 'LayersManagement',
          iconfont: 'icontuceng'
        },
        {
          label: '模板库',
          value: 'TemplatesLibs',
          iconfont: 'iconmoban'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-content-left {
  display: flex;
  flex: none;
  width: 280px;
  height: 100%;
  box-shadow: 1px 2px 4px rgba(0, 21, 41, 0.08);

  .left {
    flex-shrink: 0;
    width: 55px;
  }

  .right {
    flex-shrink: 0;
    flex-grow: 0;
    width: 225px;
    height: 100%;
  }

  ::v-deep {
    .el-tabs.el-tabs--left {
      .el-tabs__header.is-left {
        margin-right: 0;
      }
      .el-tabs__nav-scroll {
        .el-tabs__item.is-active {
          background: rgba($color: #409eff, $alpha: 0.1);
        }
      }
    }
  }
}
</style>
