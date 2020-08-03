<template>
  <div v-show="total > 0"
    :class="{'hidden':hidden}"
    class="pagination-container">
    <el-pagination :background="background"
      :current-page.sync="cmpt_currentPage"
      :page-size.sync="cmpt_pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cmpt_currentPage: {
      get () {
        return this.currentPage;
      },
      set (val) {
        this.$emit('update:currentPage', val);
      }
    },
    cmpt_pageSize: {
      get () {
        return this.pageSize;
      },
      set (val) {
        this.$emit('update:pageSize', val);
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { currentPage: this.currentPage, pageSize: val });
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize });
    }
  }
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 15px 0;
}
.pagination-container.hidden {
  display: none;
}
</style>
