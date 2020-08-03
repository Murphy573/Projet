<template>
  <el-breadcrumb class="app-breadcrumb"
    separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList"
        :key="item.path">
        <span v-if="item.forbiddenJump || index === levelList.length-1"
          class="no-redirect">
          {{ generateTitle(item.breadcrumbName) }}
        </span>
        <a v-else
          @click.prevent="handleLink(item)">{{ generateTitle(item.breadcrumbName) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      levelList: null
    };
  },
  watch: {
    $route (route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created () {
    this.getBreadcrumb();
  },
  methods: {
    generateTitle (title) {
      return this.$t(`navigation.${title}`);
    },
    getBreadcrumb () {
      let _matchedRoutes = this.$route.matched;
      let _breads = [];
      _matchedRoutes.forEach(router => {
        if (router.meta.breadcrumb) {
          _breads.push({
            name: router.name,
            query: router.query,
            params: router.params,
            path: router.path,
            forbiddenJump: router.meta.forbiddenJump,
            breadcrumbName: router.meta.breadcrumb
          });
        }
      });

      // 检验是否有dashboard
      const first = _breads[0];
      if (!this.isDashboard(first)) {
        _breads = [{ path: '/dashboard', name: 'dashboard', breadcrumbName: 'dashboard' }].concat(_breads);
      }

      this.levelList = _breads;
    },
    isDashboard (route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    },
    handleLink (item) {
      this.$router.push({
        name: item.name,
        query: item.query,
        params: item.params
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
