<template>
  <div class="template-libs">
    <h3 class="title">模版</h3>
    <div class="content">
      <MyElScrollbar>
        <section v-if="templates.length"
          class="clearfix section">
          <ul class="section-content">
            <li v-for="tpl in templates"
              :key="tpl.id"
              class="lib-item"
              @click="renderTpl(tpl.id)">
              <p class="lib-item-icon">
                <i class="icon iconfont iconchangyongshili"></i>
              </p>
              <p class="lib-item-label">
                {{tpl.description}}
              </p>
            </li>
          </ul>
        </section>
      </MyElScrollbar>
    </div>
  </div>
</template>

<script>
// import { api_get_CompAndTplLayoutConfig, api_get_templateList } from '@/apis/page.js';
import { projetMapActions } from '../../../../store/namespaced';
import Bus from '../../../../utils/bus';

export default {
  name: 'TemplatesLibs',

  data () {
    return {
      templates: []
    };
  },

  mounted () {
    // 监听模版列表获取事件
    Bus.$on('template: template-list-get', () => {
      // this.getTemplateList();
    });
    this.$once('hook:beforeDestroy', () => {
      Bus.$off('template: template-list-get');
    });
    // this.getTemplateList();
  },

  methods: {
    ...projetMapActions(['vx_ac_AddPage']),
    // 添加复合组件
    async renderTpl (layoutId) {
      try {
        await this.$confirm('该操作将会清空画布并以该模版重新渲染画布，确定继续？', '模版渲染', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
      }
      catch (error) { }
    }
    // 获取模版列表
    // async getTemplateList () {
    //   try {
    //     let list = await api_get_templateList();
    //     if (list && list.length) {
    //       this.complexComps = list;
    //     }
    //   }
    //   catch (error) { }
    // }
  }
};
</script>

<style lang="scss" scoped>
.template-libs {
  height: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }

  .content {
    height: calc(100% - 40px);

    .section {
      margin-bottom: 10px;
      padding: 0 10px;

      .section-content {
        display: flex;
        flex-flow: row wrap;

        .lib-item {
          width: calc((100% - 10px) / 2);
          flex-shrink: 0;
          padding: 10px 5px;
          border: 1px dashed #dddddd;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: All 0.3s ease-in-out;
          user-select: none;

          &:hover {
            border-color: rgba($color: $--color-primary-projet, $alpha: 1);
            color: rgba($color: $--color-primary-projet, $alpha: 1);
          }

          &:nth-child(even) {
            margin-right: 0;
          }

          .lib-item-icon {
            text-align: center;

            .icon {
              font-size: 20px;
            }
          }

          .lib-item-label {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
