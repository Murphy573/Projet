<template>
  <component :is="vx_gt_pageData.componentName"
    v-bind="vx_gt_pageData.props"
    :style="formatCommonCss(vx_gt_pageData.css)">
    <edit-shape v-for="item in vx_gt_pageData.props.elements"
      :key="item.uuid"
      :active="item.uid === vx_gt_activeElementUid"
      @element-click="handleElementClick(item.uid)">
      <component :is="item.componentName"
        :style="formatCommonCss(item.css)"
        v-bind="item.props" />
    </edit-shape>
    {{vx_gt_activeElementUid}}
  </component>
</template>

<script>
import EditShape from './edit-shape';
import { formatCommonCss } from '@/views/projet/model/css.js';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'PageCenter',

  mixins: [],

  components: { EditShape },

  props: {},

  data () {
    return {
      formatCommonCss: formatCommonCss
    };
  },

  computed: {
    ...mapGetters(['vx_gt_pageData', 'vx_gt_activeElementUid'])
  },

  watch: {},

  created () { },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handleElementClick (uid) {
      this.vx_ac_SetActiveElementUid(uid);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-center {
  overflow-y: auto;
}
</style>
