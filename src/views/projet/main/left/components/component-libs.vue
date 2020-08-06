<template>
  <div class="component-libs">
    <h3 class="title">组件库</h3>
    <div class="content">
      <MyElScrollbar>
        <section v-for="(item, index) in componentList"
          :key="index"
          class="clearfix section">
          <p class="section-title">
            {{item.label}}
          </p>
          <ul class="section-content">
            <li v-for="(element,i) in item.list"
              :key="i"
              class="lib-item"
              @click="handleClick(element)">
              <p class="lib-item-icon">
                <i class="icon iconfont"
                  :class="element.icon"></i>
              </p>
              <p class="lib-item-label">
                {{element.label}}
              </p>
            </li>
          </ul>
        </section>
      </MyElScrollbar>
    </div>
  </div>
</template>

<script>
import Components from '../../../model/components';
import MyElScrollbar from '@/components/my-el-scrollbar';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('Projet');

export default {
  name: 'ComponentLibs',

  components: { MyElScrollbar },

  data () {
    return {
      componentList: Object.freeze(Components)
    };
  },

  methods: {
    ...mapActions(['vx_ac_AddElement']),
    handleClick (element) {
      this.vx_ac_AddElement(element.componentName);
    }
  }
};
</script>

<style lang="scss" scoped>
.component-libs {
  width: 100%;
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

      .section-title {
        font-size: 14px;
        padding: 10px 0;
      }

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

          &:hover {
            border-color: rgba($color: $--color-primary, $alpha: 1);
            color: rgba($color: $--color-primary, $alpha: 1);
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
