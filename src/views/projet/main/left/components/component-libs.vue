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
import { RegisterComponentObject } from '../../../resource/index';
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
      let { props, defaultCss } = this.getComponentProps(element.componentName);

      this.vx_ac_AddElement({ componentName: element.componentName, props, defaultCss });
    },
    /**
     * 根据componentName获取组件默认props数据
     * @param componentName
     */
    getComponentProps (componentName) {
      let elComponentData;
      for (let key in RegisterComponentObject) {
        if (key.toLowerCase() === componentName.toLowerCase()) {
          elComponentData = RegisterComponentObject[key];
          break;
        }
      }
      if (!elComponentData) return {};

      let defaultCss = elComponentData.defaultCss || {};
      let props = {};
      for (let key in elComponentData.props) {
        props[key] =
          [Object, Array].includes(elComponentData.props[key].type)
            ? elComponentData.props[key].default()
            : elComponentData.props[key].default;
      }

      return { props, defaultCss };
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
