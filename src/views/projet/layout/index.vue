<template>
  <div class="projet">
    <ProjetLayoutHeader />
    <ProjetLayoutContent />
    {{vx_gt_pageData}}
  </div>
</template>

<script>
import ProjetLayoutHeader from './header/index';
import ProjetLayoutContent from './content/index';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('Projet');

export default {
  name: 'Projet',

  components: {
    ProjetLayoutHeader,
    ProjetLayoutContent
  },

  computed: {
    ...mapGetters(['vx_gt_pageData'])
  },

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
