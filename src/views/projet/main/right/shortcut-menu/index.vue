<template>
  <ul class="shortcut-menu">
    <li class="menu-item"
      :class="{disabled: !vx_gt_canCopy}"
      @click="copy">
      <i class="iconfont iconundo" />
      <p>复制</p>
    </li>
    <li class="menu-item"
      :class="{disabled: !vx_gt_canPaste}"
      @click="paste">
      <i class="iconfont iconundo" />
      <p>粘贴</p>
    </li>
    <li class="menu-item">
      <i class="iconfont iconundo" />
      <p>前移</p>
    </li>
    <li class="menu-item">
      <i class="iconfont iconundo" />
      <p>后移</p>
    </li>
    <li class="menu-item">
      <i class="iconfont iconundo" />
      <p>删除</p>
    </li>
  </ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('Projet');

export default {
  name: 'ShortcutMenu',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {

    };
  },

  computed: {
    ...mapGetters(['vx_gt_canCopy', 'vx_gt_canPaste'])
  },

  watch: {},

  created () { },

  methods: {
    ...mapActions(['vx_ac_CopyElement', 'vx_ac_PasteElement']),
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
  padding: 5px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .menu-item {
    text-align: center;
    cursor: pointer;
    user-select: none;
    width: 100%;
    padding: 5px 0;
    margin-bottom: 10px;

    &:hover {
      color: #409eff;
      background: rgba($color: $--color-primary, $alpha: 0.1);
      &:hover {
        background: rgba($color: $--color-primary, $alpha: 0.1);
      }
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
