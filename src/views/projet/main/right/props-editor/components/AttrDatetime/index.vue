<template>
  <el-date-picker v-model="myValue"
    type="datetime"
    format="yyyy-MM-dd HH:mm:ss"
    value-format="yyyy-MM-dd HH:mm:ss"
    default-time="23:59:59"
    placeholder="选择日期时间"
    :picker-options="pickerOptions"
    style="width:100%">
  </el-date-picker>
</template>

<script>

export default {
  name: 'AttrDatetime',

  props: {
    value: String
  },

  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '明天',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周后',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      }
    };
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

<style lang="scss" scoped>
</style>
