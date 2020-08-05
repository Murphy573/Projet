<template>
  <div class="page-center"
    :style="{width: vx_gt_pageData.width + 'px', height: vx_gt_pageData.height + 'px'}">
    <edit-shape v-for="item in vx_gt_pageData.elements"
      :key="item.uuid"
      :uuid="item.uuid"
      @element-click="handleElementClick(item.uid)"
      :active="item.uid === vx_gt_activeElementUid">
      <component :is="item.componentName"
        v-bind="item.props" />
    </edit-shape>

    {{vx_gt_activeElementUid}}
  </div>
</template>

<script>
import EditShape from './edit-shape';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'PageCenter',

  mixins: [],

  components: { EditShape },

  props: {},

  data () {
    return {

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
