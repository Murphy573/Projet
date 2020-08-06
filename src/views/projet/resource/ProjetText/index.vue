<template>
  <div class="projet-text"
    :style="cmpt_style">
    {{title}}---{{num}}--{{color}}
  </div>
</template>

<script>
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_NUMBER,
  PROJET_ATTR_IMAGEUPLOAD,
  PROJET_ATTR_COLORPICKER
} from '../../model/attr.editor';
import createComponent from '../../model/create-component';

export default createComponent({
  name: 'ProjetText',

  props: {
    title: {
      type: String,
      default: '这是一段文本',
      editor: {
        label: '文本内容',
        type: PROJET_ATTR_STRING
      }
    },
    num: {
      type: Number,
      default: 0,
      editor: {
        label: '数字',
        type: PROJET_ATTR_NUMBER
      }
    },
    img: {
      type: String,
      default: '',
      editor: {
        label: '背景图片',
        type: PROJET_ATTR_IMAGEUPLOAD
      }
    },
    color: {
      type: String,
      default: '',
      editor: {
        label: '文字颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    }
  },

  computed: {
    cmpt_style () {
      return Object.assign(
        {},
        this.css,
        {
          backgroundImage: `url(${this.img})`,
          color: this.color
        });
    }
  },

  defaultCss: {
    width: 200,
    height: 50
  }
});
</script>

<style lang="scss" scoped>
.projet-text {
  position: relative;
  word-break: break-all;
  overflow: hidden;
}
</style>
