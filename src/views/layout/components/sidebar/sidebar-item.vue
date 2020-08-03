<template>
  <div class="sidebar-item-container">
    <el-submenu v-if="item.children && item.children.length"
      :index="item.name"
      popper-append-to-body>
      <!-- 创建菜单分组 -->
      <template slot="title">
        <Item :icon="item.meta.icon"
          :title="generateTitle(item.meta.title)" />
      </template>
      <!-- 递归调用自身，直到subItem不含有子节点 -->
      <sidebar-item v-for="subItem of item.children"
        :item="subItem"
        :key="subItem.name"></sidebar-item>
    </el-submenu>

    <el-menu-item v-else
      :index="item.name">
      <Item :icon="item.meta.icon"
        :title="generateTitle(item.meta.title)" />
    </el-menu-item>
  </div>
</template>

<script>
import Item from './Item';

export default {
  name: 'sidebar-item',

  components: { Item },

  props: {
    item: {
      type: Object,
      require: true
    }
  },

  methods: {
    generateTitle (title) {
      return this.$t(`navigation.${title}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-item-container {
  .menu-iconfont {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  ::v-deep {
    .el-submenu {
      .el-menu-item {
        background-color: $--color-subMenuBg !important;

        &:hover {
          background-color: $--color-subMenuHoverBg !important;
        }
      }

      &.is-active > .el-submenu__title {
        color: $--color-subMenuActiveText !important;
      }
    }

    .svg-icon {
      margin-right: 16px;
    }
  }
}
</style>
