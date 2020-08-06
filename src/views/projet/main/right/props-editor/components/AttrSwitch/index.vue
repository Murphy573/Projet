<template>
  <el-switch v-model="myValue"
    :active-text="options[0].label"
    :inactive-text="options[1].label"
    :active-color="options[0].color"
    :inactive-color="options[1].color"
    :active-value="options[0].value"
    :inactive-value="options[1].value">
  </el-switch>
</template>

<script>

export default {
  name: 'AttrSwitch',

  props: {
    value: [String, Number, Boolean],
    // 第一项为激活态配置，第二项为未激活态配置
    options: {
      type: Array,
      default () {
        return [
          {
            label: '',
            // 激活时的值
            value: true,
            // 激活时的组件背景色
            color: '#13ce66'
          },
          {
            label: '',
            // 未激活时的值
            value: false,
            // 未激活时的组件背景色
            color: '#ff4949'
          }
        ];
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
