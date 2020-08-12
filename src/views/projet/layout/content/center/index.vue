<template>
  <div class="layout-content-center"
    @click="handlePageClick">
    <div class="layout-content-editor">
      <MyElScrollbar>
        <ProjetPage />
      </MyElScrollbar>
    </div>
  </div>
</template>

<script>
import MyElScrollbar from '@/components/my-el-scrollbar';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'LayoutContentCenter',

  components: { MyElScrollbar },

  computed: {
    ...mapGetters(['vx_gt_pageData'])
  },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handlePageClick () {
      this.vx_ac_SetActiveElementUid(this.vx_gt_pageData.uid);
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-content-center {
  position: relative;
  flex: 1;
  background: #eee;

  .layout-content-editor {
    width: 375px;
    height: 644px;
    box-shadow: 0 3px 10px #dcdcdc;
    margin: 25px auto;
    position: relative;
    background: white;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==');
  }
}
</style>
