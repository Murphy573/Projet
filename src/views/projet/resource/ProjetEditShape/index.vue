<template>
  <div class="edit-shape"
    :class="{active: active}"
    @click.stop="handleTopWrapperClick">
    <div class="border-line"
      :style="cmpt_style"></div>
    <slot></slot>
  </div>
</template>

<script>
import ZIndex from '../../utils/z-index';

export default {
  name: 'EditShape',

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
.edit-shape {
  width: max-content;
  height: max-content;
  position: relative !important;
  cursor: pointer;

  > .border-line {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.active {
    > .border-line {
      border: 1px dashed $--color-primary;
    }
  }
  &:hover {
    > .border-line {
      border: 1px dashed $--color-primary;
    }
  }
}
</style>
