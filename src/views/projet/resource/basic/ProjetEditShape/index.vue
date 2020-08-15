<template>
  <div class="projet-edit-shape"
    :class="{active: cmpt_active}"
    @click.stop="setActive">
    <div class="border-line"
      :style="cmpt_style"></div>
    <slot></slot>
  </div>
</template>

<script>
import ZIndex from '../../../utils/z-index';
import { projetMapActions, projetMapGetters } from '../../../store/namespaced';

export default {
  name: 'ProjetEditShape',

  props: {
    uid: String
  },

  computed: {
    ...projetMapGetters(['vx_gt_activeElementUid']),
    cmpt_style () {
      return {
        zIndex: ZIndex.zIndex
      };
    },
    cmpt_active () {
      return this.vx_gt_activeElementUid === this.uid;
    }
  },

  methods: {
    ...projetMapActions(['vx_ac_SetActiveElementUid']),
    setActive () {
      this.vx_ac_SetActiveElementUid(this.uid);
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
