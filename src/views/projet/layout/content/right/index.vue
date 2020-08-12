<template>
  <div class="layout-content-right">
    <section class="left">
      <ShortcutMenu />
    </section>
    <section class="right">
      <el-tabs v-model="activeName">
        <el-tab-pane label="属性"
          name="prop"
          lazy>
          <PropsEditor />
        </el-tab-pane>
        <el-tab-pane label="样式"
          name="css"
          lazy>
          <CssEditor />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import ShortcutMenu from './shortcut-menu/index';
import PropsEditor from './props-editor/index';
import CssEditor from './css-editor/index';

export default {
  name: 'LayoutContentRight',

  components: { ShortcutMenu, PropsEditor, CssEditor },

  data () {
    return {
      activeName: 'prop'
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-content-right {
  display: flex;
  width: 415px;
  flex: none;
  height: 100%;

  .left {
    width: 55px;
    height: 100%;
    flex: none;
    background: #ffffff;
    border-right: 1px solid #e4e7ed;
    box-shadow: -1px 1px 4px rgba(0, 21, 41, 0.08);
  }

  .right {
    flex: none;
    width: calc(100% - 55px);
    height: 100%;
    padding: 0 10px;

    ::v-deep {
      .el-tabs {
        height: 100%;
      }
      .el-tabs__content {
        height: calc(100% - 55px);
        & > div {
          height: 100%;
        }
        // .attr-edit-inner {
        //   padding-left: 16px;
        //   padding-right: 16px;
        // }
      }
    }
  }
}
</style>
