<template>
  <el-checkbox-group v-model="myValue">
    <el-checkbox v-for="item in options"
      :key="item.value"
      :label="item.value">{{item.label}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>

export default {
  name: 'AttrCheckbox',

  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    },
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
