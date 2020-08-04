<template>
  <div class="projet">
    <ProjetHeader />
    <ProjetMain />
  </div>
</template>

<script>
import ProjetHeader from './header/index';
import ProjetMain from './main/index';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('Projet');

export default {
  name: 'Projet',

  mixins: [],

  components: {
    ProjetHeader,
    ProjetMain
  },

  props: {},

  data () {
    return {

    };
  },

  computed: {
    ...mapGetters(['vx_gt_pageData'])
  },

  watch: {},

  created () {
    this.pageInit();
  },

  methods: {
    ...mapActions(['vx_ac_AddPage']),
    pageInit () {
      this.vx_ac_AddPage();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
