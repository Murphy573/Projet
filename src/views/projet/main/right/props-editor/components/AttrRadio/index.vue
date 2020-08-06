<template>
  <el-radio-group v-model="myValue">
    <el-radio v-for="item in options"
      :key="item.value"
      :label="item.value">{{item.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>

export default {
  name: 'AttrRadio',

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
