<template>
  <div class="project-page"
    :style="formatCommonCss(vx_gt_pageData.css)">
    <ProjetEditShape v-for="item in vx_gt_pageData.props.elements"
      :key="item.uuid"
      :active="item.uid === vx_gt_activeElementUid"
      @element-click="handleElementClick(item.uid)"
      :style="formatCommonCss(item.css)">
      <component :is="item.componentName"
        v-bind="item.props" />
    </ProjetEditShape>
  </div>
</template>

<script>
/* 根页面组件 */
import ProjetEditShape from '../ProjetEditShape';
import { formatCommonCss } from '@/views/projet/model/css.js';
import { PROJET_ATTR_STRING } from '@/views/projet/model/attr.editor';
import createComponent from '@/views/projet/model/create-component';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default createComponent({
  name: 'ProjetPage',

  components: {
    ProjetEditShape
  },

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
    ...mapGetters(['vx_gt_pageData', 'vx_gt_activeElementUid'])
  },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handleElementClick (uid) {
      this.vx_ac_SetActiveElementUid(uid);
    }
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
