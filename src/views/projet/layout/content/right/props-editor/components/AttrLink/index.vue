<template>
  <el-input v-model="myValue"
    placeholder="输入跳转链接"></el-input>
</template>
<script>

export default {
  name: 'AttrLink',

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
