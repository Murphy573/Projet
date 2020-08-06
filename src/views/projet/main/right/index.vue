<template>
  <div class="main-right">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性"
        name="prop"
        style="max-height:100%"
        lazy>
        <PropsEditor />
      </el-tab-pane>
      <el-tab-pane label="样式"
        name="css"
        lazy>
        <CssEditor />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PropsEditor from './props-editor/index';
import CssEditor from './css-editor/index';

export default {
  name: 'MainRight',

  mixins: [],

  components: { PropsEditor, CssEditor },

  props: {},

  data () {
    return {
      activeName: 'prop'
    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.main-right {
  width: 280px;
  flex: none;
  height: 100%;
  box-shadow: -1px 2px 4px rgba(0, 21, 41, 0.08);
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
</style>
