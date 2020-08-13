<template>
  <span class="projet-countdown"
    :style="css">
    <van-count-down :time="cmpt_time">
      <template v-slot="{days, hours, minutes, seconds}">
        <span class="block"
          :style="cmpt_blockStyle">{{ (days * 24 + hours)|ft_pad }}</span>
        <span class="colon"
          :style="cmpt_colonStyle">:</span>
        <span class="block"
          :style="cmpt_blockStyle">{{ minutes|ft_pad }}</span>
        <span class="colon"
          :style="cmpt_colonStyle">:</span>
        <span class="block"
          :style="cmpt_blockStyle">{{ seconds|ft_pad }}</span>
      </template>
    </van-count-down>
  </span>
</template>

<script>
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_NUMBER,
  PROJET_ATTR_DATETIME,
  PROJET_ATTR_COLORPICKER
} from '../../../model/attr.editor';
import createComponent from '../../../model/create-component';

export default createComponent({
  name: 'ProjetCountdown',
  // 左侧面板展示名称
  dispayLabel: '倒计时',
  // 左侧面板展示icon
  displayIconfont: 'icondaojishi',

  props: {
    title: {
      type: String,
      default: '这是一个倒计时',
      editor: {
        label: '倒计时名称',
        type: PROJET_ATTR_STRING
      }
    },
    endDatetime: {
      type: String,
      default: '',
      editor: {
        label: '截止时间',
        type: PROJET_ATTR_DATETIME
      }
    },
    colonColor: {
      type: String,
      default: '#ee0a24',
      editor: {
        label: '指示器颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    },
    blockBorderRadius: {
      type: Number,
      default: 4,
      editor: {
        label: '块圆角',
        type: PROJET_ATTR_NUMBER
      }
    },
    blockBgColor: {
      type: String,
      default: '#ee0a24',
      editor: {
        label: '块背景色',
        type: PROJET_ATTR_COLORPICKER
      }
    },
    textColor: {
      type: String,
      default: '#ffffff',
      editor: {
        label: '文本颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    }
  },

  filters: {
    ft_pad (v) {
      if (v < 10) {
        return 0 + '' + v;
      }
      return v;
    }
  },

  computed: {
    cmpt_time () {
      if (!this.endDatetime) return 0;

      let futureTime = this.endDatetime,
        curTime = new Date().getTime();

      if (typeof futureTime === 'string') {
        futureTime = futureTime.replace(/-/g, '/');
      }
      futureTime = new Date(futureTime).getTime();

      let diffTime = futureTime - curTime;

      return diffTime >= 0 ? diffTime : 0;
    },
    cmpt_blockStyle () {
      return {
        'background-color': this.blockBgColor,
        'border-radius': this.blockBorderRadius + 'px',
        color: this.textColor
      };
    },
    cmpt_colonStyle () {
      return {
        color: this.colonColor
      };
    }
  },

  defaultCss: {
    width: 100,
    height: 30
  }
});
</script>

<style lang="scss" scoped>
.projet-countdown {
  display: inline-block;

  .colon {
    display: inline-block;
    margin: 0 4px;
  }
  .block {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>
