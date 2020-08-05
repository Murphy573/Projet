<template>
  <div class="main-center"
    @click="handlePageClick">
    <div class="main-editor"
      :style="{width: vx_gt_pageData.width + 'px', height: vx_gt_pageData.height + 'px'}">
      <PageCenter />
    </div>
  </div>
</template>

<script>
import PageCenter from './components/page';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'MainCenter',

  components: { PageCenter },

  computed: {
    ...mapGetters(['vx_gt_pageData'])
  },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handlePageClick () {
      debugger;
      this.vx_ac_SetActiveElementUid(this.vx_gt_pageData.uid);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-center {
  position: relative;
  flex: 1;
  background: #eee;

  .main-editor {
    box-shadow: 0 3px 10px #dcdcdc;
    margin: 25px auto;
    position: relative;
    background: white;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==');
  }
}
</style>
