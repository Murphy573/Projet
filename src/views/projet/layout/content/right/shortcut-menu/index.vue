<template>
  <ul class="shortcut-menu">
    <li class="menu-item"
      :class="{disabled: !vx_gt_canCopy}"
      @click="copy">
      <i class="iconfont iconcopy" />
      <p>复制</p>
    </li>
    <li class="menu-item"
      :class="{disabled: !vx_gt_canPaste}"
      @click="paste">
      <i class="iconfont iconniantie" />
      <p>粘贴</p>
    </li>
    <li class="menu-item"
      :class="{disabled:!vx_gt_canMoveForward}"
      @click="forward">
      <i class="iconfont iconshang" />
      <p>前移</p>
    </li>
    <li class="menu-item"
      :class="{disabled:!vx_gt_canMoveBackward}"
      @click="backward">
      <i class="iconfont iconxia" />
      <p>后移</p>
    </li>
    <li class="menu-item"
      :class="{disabled:!vx_gt_canDelElement}"
      @click="del">
      <i class="iconfont iconshanchu" />
      <p>删除</p>
    </li>
  </ul>
</template>

<script>
import { projetMapActions, projetMapGetters } from '../../../../store/namespaced';

export default {
  name: 'ShortcutMenu',

  computed: {
    ...projetMapGetters([
      'vx_gt_canCopy',
      'vx_gt_canPaste',
      'vx_gt_canMoveForward',
      'vx_gt_canMoveBackward',
      'vx_gt_canDelElement'
    ])
  },

  methods: {
    ...projetMapActions([
      'vx_ac_CopyElement',
      'vx_ac_PasteElement',
      'vx_ac_MoveForwardAndBackward',
      'vx_ac_DelElement'
    ]),
    async copy () {
      try {
        if (!this.vx_gt_canCopy) return;
        let _copiedElementTitle = await this.vx_ac_CopyElement();

        if (_copiedElementTitle) {
          this.$message.success(`已复制：${_copiedElementTitle}`);
        }
      }
      catch (error) { }
    },
    paste () {
      if (!this.vx_gt_canPaste) return;
      this.vx_ac_PasteElement();
    },
    forward () {
      if (!this.vx_gt_canMoveForward) return;
      this.vx_ac_MoveForwardAndBackward('forward');
    },
    backward () {
      if (!this.vx_gt_canMoveBackward) return;
      this.vx_ac_MoveForwardAndBackward('backward');
    },
    del () {
      if (!this.vx_gt_canDelElement) return;
      this.vx_ac_DelElement();
    }
  }
};
</script>

<style lang="scss" scoped>
.shortcut-menu {
  width: 100%;
  height: 100%;
  background: #ffffff;
  font-size: 14px;
  padding: 25px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  .menu-item {
    text-align: center;
    cursor: pointer;
    user-select: none;
    width: 100%;
    padding: 5px 0;
    margin-bottom: 10px;

    &:not(.disabled):hover {
      color: $--color-primary-projet;
      background: rgba($color: $--color-primary-projet, $alpha: 0.1);
    }

    &.disabled {
      opacity: 0.2;
      cursor: not-allowed;
      &:hover {
        background: none;
      }
    }

    p {
      padding-top: 6px;
      font-size: 12px;
      word-break: keep-all;
    }
  }
}
</style>
