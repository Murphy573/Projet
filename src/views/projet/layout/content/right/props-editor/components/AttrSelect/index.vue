<template>
  <el-select v-model="myValue"
    style="width:100%;">
    <el-option v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'AttrSelect',

  props: {
    value: [String, Number],
    options: {
      type: Array,
      default () {
        return [];
      }
    }
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
