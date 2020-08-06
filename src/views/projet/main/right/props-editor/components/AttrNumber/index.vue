<template>
  <el-input-number v-model="myValue"
    controls-position="right"
    style="width:100%;"></el-input-number>
</template>
<script>

export default {
  name: 'AttrNumber',

  props: {
    value: [String, Number]
  },

  computed: {
    myValue: {
      set (v) {
        this.$emit('input', v);
      },
      get () {
        return this.value;
      }
    }
  }
};
</script>
