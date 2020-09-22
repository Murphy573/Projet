<template>
  <div class="projet-swiper">
    <van-swipe class="swiper"
      ref="swiper"
      :autoplay="cmpt_autoplay"
      :showIndicators="showIndicators"
      :indicator-color="indicatorColor"
      @change="onChange">
      <van-swipe-item v-for="item in elements"
        :key="item.uid">
        <ProjetEditShape :uid="item.uid"
          :style="formatCommonCss(item.css)">
          <component :is="item.componentName"
            :uid="item.uid"
            v-bind="item.props" />
        </ProjetEditShape>
      </van-swipe-item>
      <!-- 指示器 -->
      <template v-if="showIndicators"
        #indicator>
        <div class="swiper-indicator"
          :style="cmpt_indicatorWrapperStyle">
          <i v-for="index of elements.length"
            :key="index"
            class="item"
            :class="{active: index-1===currentIndex}"
            :style="itemStyle(index)">
          </i>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
/* 轮播容器 */
import { formatCommonCss } from '../../../model/css.js';
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_NUMBER,
  PROJET_ATTR_SWITCH,
  PROJET_ATTR_COLORPICKER
} from '../../../model/attr.editor';
import createComponent from '../../../model/create-component';
import { projetMapGetters } from '../../../store/namespaced';

export default createComponent({
  name: 'ProjetSwiper',
  // 左侧面板展示名称
  displayLabel: '轮播容器',
  // 左侧面板展示icon
  displayIcon: 'iconlunbo',

  props: {
    title: {
      type: String,
      default: '轮播容器',
      editor: {
        label: '容器名称',
        type: PROJET_ATTR_STRING
      }
    },
    autoplay: {
      type: Boolean,
      default: false,
      editor: {
        label: '自动播放',
        type: PROJET_ATTR_SWITCH
      }
    },
    interval: {
      type: Number,
      default: 2,
      editor: {
        label: '播放间隔(s)',
        type: PROJET_ATTR_NUMBER
      }
    },
    showIndicators: {
      type: Boolean,
      default: true,
      editor: {
        label: '显示指示器',
        type: PROJET_ATTR_SWITCH
      }
    },
    indicatorColor: {
      type: String,
      default: '#ebedf0',
      editor: {
        label: '指示器颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    },
    indicatorActiveColor: {
      type: String,
      default: '#DD1A21',
      editor: {
        label: '指示器激活颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    },
    indicatorBottom: {
      type: Number,
      default: 12,
      editor: {
        label: '指示器底部位置',
        type: PROJET_ATTR_NUMBER
      }
    }
  },

  data () {
    return {
      formatCommonCss: formatCommonCss,
      currentIndex: 0
    };
  },

  computed: {
    ...projetMapGetters([
      'vx_gt_activeElementPuid',
      'vx_gt_activeElementUid'
    ]),
    cmpt_autoplay () {
      if (!this.autoplay) return 0;
      let _interval = this.interval * 1000;
      return _interval < 0 ? 1000 : _interval;
    },
    cmpt_indicatorWrapperStyle () {
      return {
        bottom: this.indicatorBottom + 'px'
      };
    }
  },

  watch: {
    vx_gt_activeElementUid: 'switch2Current',
    elements: {
      handler: 'switch2Current',
      deep: true
    }
  },

  methods: {
    onChange (index) {
      this.currentIndex = index;
    },
    itemStyle (index) {
      return {
        backgroundColor: index - 1 === this.currentIndex ? this.indicatorActiveColor : this.indicatorColor
      };
    },
    switch2Current () {
      this.$nextTick(_ => {
        let _uid = this.$attrs.uid;
        if (this.vx_gt_activeElementPuid !== _uid) return;
        // 监听uid，切换到对应item
        let _index = this.elements.findIndex(ele => ele.uid === this.vx_gt_activeElementUid);
        if (_index > -1) {
          this.$refs.swiper && this.$refs.swiper.swipeTo(_index);
        }
      });
    }
  },

  defaultCss: {
    width: 375,
    height: 150
  }
}, true);
</script>

<style lang="scss" scoped>
.projet-swiper {
  position: relative;
  width: 100%;
  height: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-indicator {
    position: absolute;
    bottom: 12px;
    left: 50%;
    display: flex;
    transform: translateX(-50%);

    .item {
      width: 6px;
      height: 6px;
      border-radius: 100%;
      transition: background-color 0.2s;

      &:not(:last-child) {
        margin-right: 6px;
      }

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
