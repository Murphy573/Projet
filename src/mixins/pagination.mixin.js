/**
 * 分页混入
 * 使用方式：引入该混入，然后复制以下代码：
 * <Pagination :total="pageParamsMixin.total"
      :currentPage.sync="pageParamsMixin.currentPage"
      :pageSize.sync="pageParamsMixin.pageSize"
      @pagination="queryList()" />

      queryList自己定义并实现，记得当输入搜索条件时，调用setFirstPageMixin将页码重置为1
 */
import Pagination from '@/components/pagination';

const PAGEPARAMS = {
  currentPage: 1,
  pageSize: 20,
  total: 0
};

export default {
  components: { Pagination },
  data () {
    return {
      pageParamsMixin: Object.assign({}, PAGEPARAMS)
    };
  },
  methods: {
    setFirstPageMixin () {
      this.pageParamsMixin.currentPage = 1;
    },
    setTotalCountMixin (total) {
      this.pageParamsMixin.total = total;
    },
    buildPageParamsMixin () {
      return {
        currentPage: this.pageParamsMixin.currentPage,
        pageSize: this.pageParamsMixin.pageSize
      };
    }
  }
};
