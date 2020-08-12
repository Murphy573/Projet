<template>
  <el-input v-model="myValue"></el-input>
</template>
<script>

export default {
  name: 'AttrInput',

  props: {
    value: String
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
