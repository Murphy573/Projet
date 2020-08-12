<template>
  <div class="props-editor">
    <MyElScrollbar>
      <el-form label-position="left"
        label-width="100px"
        size="small">
        <el-form-item label="唯一ID">
          <el-tag type="danger">{{vx_gt_activeElementData.uid}}</el-tag>
        </el-form-item>
        <el-form-item v-for="item of cmpt_editorList"
          :key="item.key"
          :label="item.label">
          <component :is="item.renderType"
            :options="item.options"
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
import AttrLink from './components/AttrLink';
import AttrSelect from './components/AttrSelect';
import AttrSwitch from './components/AttrSwitch';
import AttrRadio from './components/AttrRadio';
import AttrCheckbox from './components/AttrCheckbox';
import AttrDatetime from './components/AttrDatetime';
/* 属性组件 end */

import { getComponentPropsEditors } from '../../../../utils/element';
import { projetMapGetters } from '../../../../store/namespaced';

export default {
  name: 'PropsEditor',

  components: {
    MyElScrollbar,
    AttrInput,
    AttrNumber,
    AttrImageUpload,
    AttrColorpicker,
    AttrLink,
    AttrSelect,
    AttrSwitch,
    AttrRadio,
    AttrCheckbox,
    AttrDatetime
  },

  computed: {
    ...projetMapGetters(['vx_gt_activeElementData']),
    cmpt_activeElementProps () {
      return this.vx_gt_activeElementData.props;
    },
    cmpt_editorList () {
      return getComponentPropsEditors(this.vx_gt_activeElementData.componentName);
    }
  }
};
</script>

<style lang="scss" scoped>
.props-editor {
  height: 100%;
  overflow: hidden;

  ::v-deep {
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
