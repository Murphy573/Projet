<template>
  <div class="props-editor">
    <MyElScrollbar>
      <el-form label-position="left"
        label-width="80px"
        size="small">
        <el-form-item label="唯一ID">
          <el-tag type="danger">{{vx_gt_activeElementData.uid}}</el-tag>
        </el-form-item>
        <el-form-item v-for="item of cmpt_editorList"
          :key="item.key"
          :label="item.label">
          <component :is="item.renderType"
            v-model="cmpt_activeElementProps[item.propKey]"></component>
        </el-form-item>
      </el-form>
    </MyElScrollbar>
  </div>
</template>

<script>
import MyElScrollbar from '@/components/my-el-scrollbar';
/* 属性组件 begin */
import AttrInput from './components/AttrInput';
import AttrNumber from './components/AttrNumber';
import AttrImageUpload from './components/AttrImageUpload';
import AttrColorpicker from './components/AttrColorpicker';
/* 属性组件 end */

import { getComponentPropsEditors } from '@/views/projet/utils/element';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'PropsEditor',

  mixins: [],

  components: {
    MyElScrollbar,
    AttrInput,
    AttrNumber,
    AttrImageUpload,
    AttrColorpicker
  },

  props: {},

  data () {
    return {

    };
  },

  computed: {
    ...mapGetters(['vx_gt_activeElementData']),
    cmpt_activeElementProps () {
      return this.vx_gt_activeElementData.props;
    },
    cmpt_editorList () {
      return getComponentPropsEditors(this.vx_gt_activeElementData.componentName);
    }
  },

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.props-editor {
  height: 100%;
  overflow: hidden;
}
</style>
