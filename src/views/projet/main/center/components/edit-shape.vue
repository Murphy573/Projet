<template>
  <div class="edit-shape"
    :class="{active: active}"
    @click.stop="handleTopWrapperClick">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'EditShape',

  props: {
    uid: String,
    active: Boolean
  },

  methods: {
    handleTopWrapperClick () {
      this.$emit('element-click');
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-shape {
  position: relative;
  cursor: pointer;

  &.active {
    outline: 1px dashed $--color-primary;
  }
  &:hover {
    outline: 1px dashed $--color-primary;
  }
}
</style>
