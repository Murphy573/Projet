<template>
  <div class="layers-management">
    <h3 class="title">图层管理</h3>
    <div class="content">
      <MyElScrollbar>
        <el-tree ref="tree"
          :data="vx_gt_genElementsTree"
          node-key="uid"
          :default-expanded-keys="cmpt_defaultExpandKeys"
          :props="defaultProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          :current-node-key="vx_gt_activeElementUid"
          @node-click="handleNodeClick"
          style="max-width:100%;"></el-tree>
      </MyElScrollbar>
    </div>
  </div>
</template>

<script>
import MyElScrollbar from '@/components/my-el-scrollbar';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'LayersManagement',

  components: { MyElScrollbar },

  data () {
    return {
      defaultProps: {
        label: 'title',
        children: 'elements'
      }
    };
  },

  computed: {
    ...mapGetters(['vx_gt_activeElementUid', 'vx_gt_genElementsTree']),
    cmpt_defaultExpandKeys () {
      return [this.vx_gt_activeElementUid];
    }
  },

  watch: {
    vx_gt_activeElementUid (v) {
      this.$nextTick(_ => {
        this.$refs.tree && this.$refs.tree.setCurrentKey(v);
      });
    }
  },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handleNodeClick (data) {
      this.vx_ac_SetActiveElementUid(data.uid);
    }
  }
};
</script>

<style lang="scss" scoped>
.layers-management {
  height: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }
  .content {
    height: calc(100% - 40px);
    overflow: auto;
  }
}
</style>
