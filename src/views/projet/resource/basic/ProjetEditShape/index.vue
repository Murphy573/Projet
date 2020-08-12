<template>
  <div class="projet-edit-shape"
    :class="{active: active}"
    @click.stop="handleTopWrapperClick">
    <div class="border-line"
      :style="cmpt_style"></div>
    <slot></slot>
  </div>
</template>

<script>
import ZIndex from '@/views/projet/utils/z-index';

export default {
  name: 'ProjetEditShape',

  props: {
    active: Boolean
  },

  methods: {
    handleTopWrapperClick () {
      this.$emit('element-click');
    }
  },
  computed: {
    cmpt_style () {
      return {
        zIndex: ZIndex.zIndex
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.projet-edit-shape {
  position: relative !important;
  overflow: hidden;
  cursor: pointer;

  > .border-line {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed rgba($color: #ddd, $alpha: 1);
  }

  &.active {
    > .border-line {
      border: 2px dashed $--color-primary;
    }
  }
  &:hover {
    > .border-line {
      border: 2px dashed $--color-primary;
    }
  }
}
</style>
