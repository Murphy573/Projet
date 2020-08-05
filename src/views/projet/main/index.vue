<template>
  <div class="projet-main">
    <MainLeft />
    <MainCenter />
    <MainRight />
  </div>
</template>

<script>
import MainLeft from './left';
import MainCenter from './center';
import MainRight from './right';

export default {
  name: 'ProjetMain',

  mixins: [],

  components: { MainLeft, MainCenter, MainRight },

  props: {},

  data () {
    return {

    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.projet-main {
  display: flex;
  height: 700px;
}
</style>
