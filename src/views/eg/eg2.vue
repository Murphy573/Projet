<template>
  <div class="app-container">
    实例2：CODE1和CODE2权限码
    <p>下面的value在同级路由下是缓存的</p>
    <el-input v-model="value"
      v-number></el-input>
  </div>
</template>

<script>

export default {
  name: 'Eg2',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      value: 1
    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
