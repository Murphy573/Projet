<template>
  <div class="my-scrollbar"
    :class="cmpt_class">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name: 'MyElScrollbar',

  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    cmpt_class () {
      return {
        horizontal: this.horizontal,
        vertical: this.vertical
      };
    }
  },

  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.my-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1001;

  &.vertical {
    ::v-deep {
      .el-scrollbar {
        width: 100%;
        height: 100%;

        .scrollbar-wrapper {
          overflow-x: hidden !important;
        }

        .el-scrollbar__bar {
          &.is-vertical {
            right: 0;
          }
        }
      }
    }
  }
}
</style>
