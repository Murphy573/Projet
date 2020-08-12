<template>
  <div class="projet-swiper"
    :style="cmpt_style">
    <van-swipe class="swiper"
      ref="swiper"
      :autoplay="cmpt_autoplay"
      :showIndicators="showIndicators"
      :indicator-color="indicatorColor">
      <van-swipe-item v-for="item in elements"
        :key="item.uid">
        <ProjetEditShape :active="item.uid === vx_gt_activeElementUid"
          :style="formatCommonCss(item.css)"
          @element-click="handleElementClick(item.uid)">
          <component :is="item.componentName"
            :uid="item.uid"
            v-bind="item.props" />
        </ProjetEditShape>
      </van-swipe-item>
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
import { projetMapActions, projetMapGetters } from '../../../store/namespaced';

export default createComponent({
  name: 'ProjetSwiper',
  // 左侧面板展示名称
  dispayLabel: '轮播容器',
  // 左侧面板展示icon
  displayIconfont: 'iconwenben',

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
      default: 'rgba(143, 18, 18, 1)',
      editor: {
        label: '指示器颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    }
  },

  data () {
    return {
      formatCommonCss: formatCommonCss
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
    cmpt_style () {
      return Object.assign(
        {},
        this.css);
    }
  },

  watch: {
    vx_gt_activeElementUid () {
      this.$nextTick(_ => {
        if (this.vx_gt_activeElementPuid !== this.uid) return;
        // 监听uid，切换到对应item
        let _index = this.elements.findIndex(ele => ele.uid === this.vx_gt_activeElementUid);
        if (_index > -1) {
          this.$refs.swiper && this.$refs.swiper.swipeTo(_index);
        }
      });
    },
    elements: {
      handler () {
        this.$nextTick(_ => {
          if (this.vx_gt_activeElementPuid !== this.uid) return;
          // 监听uid，切换到对应item
          let _index = this.elements.findIndex(ele => ele.uid === this.vx_gt_activeElementUid);
          if (_index > -1) {
            this.$refs.swiper && this.$refs.swiper.swipeTo(_index);
          }
        });
      },
      deep: true
    }
  },

  methods: {
    ...projetMapActions(['vx_ac_SetActiveElementUid']),
    handleElementClick (uid) {
      this.vx_ac_SetActiveElementUid(uid);
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
}
</style>
