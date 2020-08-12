<template>
  <div class="projet">
    <ProjetLayoutHeader />
    <ProjetLayoutContent />
  </div>
</template>

<script>
import ProjetLayoutHeader from './header/index';
import ProjetLayoutContent from './content/index';
import { projetMapActions, projetMapGetters } from '../store/namespaced';

export default {
  name: 'Projet',

  components: {
    ProjetLayoutHeader,
    ProjetLayoutContent
  },

  computed: {
    ...projetMapGetters(['vx_gt_pageData'])
  },

  created () {
    this.pageInit();
  },

  methods: {
    ...projetMapActions(['vx_ac_AddPage']),
    pageInit () {
      this.vx_ac_AddPage();
    }
  }
};
</script>

<style lang="scss">
.full-width {
  width: 100%;
}
.el-form {
  .el-form-item {
    // margin-bottom: 30px !important;

    &.el-form-item-bottom-0 {
      margin-bottom: 0 !important;
    }
  }
}
</style>
