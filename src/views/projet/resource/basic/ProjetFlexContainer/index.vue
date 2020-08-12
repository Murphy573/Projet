<template>
  <div class="project-flex-container"
    :style="cmpt_style">
    <ProjetEditShape v-for="item in elements"
      :key="item.uuid"
      :active="item.uid === vx_gt_activeElementUid"
      :style="formatCommonCss(item.css)"
      @element-click="handleElementClick(item.uid)">
      <!-- 动态子元素 -->
      <component :is="item.componentName"
        :uid="item.uid"
        v-bind="item.props" />
    </ProjetEditShape>
  </div>
</template>

<script>
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_SELECT,
  PROJET_ATTR_RADIO
  // PROJET_ATTR_SWITCH
} from '@/views/projet/model/attr.editor';
import createComponent from '@/views/projet/model/create-component';
import { formatCommonCss } from '@/views/projet/model/css.js';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('Projet');

export default createComponent({
  name: 'ProjetFlexContainer',
  // 左侧面板展示名称
  dispayLabel: '弹性容器',
  // 左侧面板展示icon
  displayIconfont: 'iconwenben',

  props: {
    title: {
      type: String,
      default: '弹性容器',
      editor: {
        label: '容器名称',
        type: PROJET_ATTR_STRING
      }
    },
    direction: {
      type: String,
      default: 'row',
      editor: {
        label: '主轴方向',
        type: PROJET_ATTR_SELECT,
        options: [
          {
            label: '水平方向，起点左端',
            value: 'row'
          },
          {
            label: '垂直方向，起点上沿',
            value: 'column'
          }
        ]
      }
    },
    wrap: {
      type: String,
      default: 'nowrap',
      editor: {
        label: '轴线换行',
        type: PROJET_ATTR_RADIO,
        options: [
          {
            label: '不换行',
            value: 'nowrap'
          },
          {
            label: '换行',
            value: 'wrap'
          }
        ]
      }
    },
    justify: {
      type: String,
      default: 'flex-start',
      editor: {
        label: '主轴对齐方式',
        type: PROJET_ATTR_SELECT,
        options: [
          {
            label: '主轴起始点',
            value: 'flex-start'
          },
          {
            label: '主轴居中',
            value: 'center'
          },
          {
            label: '主轴终点',
            value: 'flex-end'
          },
          {
            label: '主轴两端对齐',
            value: 'space-between'
          }
        ]
      }
    },
    align: {
      type: String,
      default: 'flex-start',
      editor: {
        label: '交叉轴对齐方式',
        type: PROJET_ATTR_SELECT,
        options: [
          {
            label: '交叉轴起始点',
            value: 'flex-start'
          },
          {
            label: '交叉轴居中',
            value: 'center'
          },
          {
            label: '交叉轴终点',
            value: 'flex-end'
          }
        ]
      }
    }
    // overflowx: {
    //   type: String,
    //   default: 'hidden',
    //   editor: {
    //     label: '横向滚动',
    //     type: PROJET_ATTR_SWITCH,
    //     options: [
    //       {
    //         label: '',
    //         // 激活时的值
    //         value: 'auto',
    //         // 激活时的组件背景色
    //         color: '#13ce66'
    //       },
    //       {
    //         label: '',
    //         // 未激活时的值
    //         value: 'hidden',
    //         // 未激活时的组件背景色
    //         color: '#ff4949'
    //       }
    //     ]
    //   }
    // }
  },

  data () {
    return {
      formatCommonCss: formatCommonCss
    };
  },

  computed: {
    ...mapGetters(['vx_gt_activeElementUid']),
    cmpt_style () {
      return Object.assign(
        {},
        this.css,
        {
          display: 'flex',
          flexDirection: this.direction,
          flexWrap: this.wrap,
          justifyContent: this.justify,
          alignItems: this.align
          // overflowX: this.overflowx
        });
    }
  },

  methods: {
    ...mapActions(['vx_ac_SetActiveElementUid']),
    handleElementClick (uid) {
      this.vx_ac_SetActiveElementUid(uid);
    }
  },

  defaultCss: {
    height: 150
  }
}, true);
</script>

<style lang="scss" scoped>
.project-flex-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
