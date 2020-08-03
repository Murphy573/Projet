<template>
  <section class="app-main">
    <transition name="fade-transform"
      mode="out-in">
      <keep-alive :include="vx_gt_CachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutMain',
  computed: {
    ...mapGetters(['vx_gt_CachedViews']),
    key () {
      return this.$route.name;
    }
  }
};
</script>
