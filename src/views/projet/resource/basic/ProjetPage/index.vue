<template>
  <div class="project-page"
    :style="formatCommonCss(vx_gt_pageData.css)">
    <ProjetEditShape v-for="item in vx_gt_pageData.props.elements"
      :key="item.uid"
      :uid="item.uid"
      :style="formatCommonCss(item.css)">
      <component :is="item.componentName"
        :uid="item.uid"
        v-bind="item.props" />
    </ProjetEditShape>
  </div>
</template>

<script>
/* 根页面组件 */
import { formatCommonCss } from '../../../model/css.js';
import { PROJET_ATTR_STRING } from '../../../model/attr.editor';
import createComponent from '../../../model/create-component';
import { projetMapGetters } from '../../../store/namespaced';

export default createComponent({
  name: 'ProjetPage',

  props: {
    title: {
      type: String,
      default: '根页面标题',
      editor: {
        label: '页面标题',
        type: PROJET_ATTR_STRING
      }
    }
  },

  data () {
    return {
      formatCommonCss: formatCommonCss
    };
  },

  computed: {
    ...projetMapGetters(['vx_gt_pageData'])
  },

  defaultCss: {
    width: 375,
    height: 'auto'
  }
}, true);
</script>

<style lang="scss" scoped>
.project-page {
  position: relative;
}
</style>
