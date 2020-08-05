<template>
  <div class="projet-header">
    <section class="left">
      Projet
    </section>
    <section class="center">
      <ul class="control-bar">
        <li class="bar-item disabled"
          @click="undo">
          <i class="iconfont iconundo" />
          <p>撤销</p>
        </li>
        <li class="bar-item">
          <i class="iconfont iconredo" />
          <p>反撤销</p>
        </li>
        <li class="bar-item active">
          <i class="iconfont iconicon4" />
          <p>开发</p>
        </li>
        <li class="bar-item">
          <i class="iconfont iconyulan" />
          <p>预览</p>
        </li>
        <li class="bar-item">
          <i class="iconfont iconbaocun" />
          <p>保存</p>
        </li>
        <li class="bar-item">
          <i class="iconfont iconfabu" />
          <p>发布</p>
        </li>
      </ul>
    </section>
    <section class="right">
    </section>
  </div>
</template>

<script>

export default {
  name: 'ProjetHeader',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {

    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    undo () {
      alert(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.projet-header {
  padding: 0 10px;
  height: 48px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    width: 60px;
  }

  .center {
    height: 100%;
    padding: 3px 0;
    .control-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding-top: 2px;

      .bar-item {
        text-align: center;
        height: 100%;
        margin-right: 12px;
        min-width: 40px;
        cursor: pointer;

        &:hover {
          background: #ddd;
        }

        &.disabled {
          opacity: 0.2;
          cursor: not-allowed;
          &:hover {
            background: none;
          }
        }

        &.active {
          color: #409eff;
          background: rgba($color: $--color-primary, $alpha: 0.1);
          &:hover {
            background: rgba($color: $--color-primary, $alpha: 0.1);
          }
        }

        p {
          padding-top: 6px;
          font-size: 12px;
          word-break: keep-all;
        }
      }
    }
  }
}
</style>
