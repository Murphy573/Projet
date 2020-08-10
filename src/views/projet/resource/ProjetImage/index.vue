<template>
  <div class="projet-img"
    :style="css">
    <img :src="src"
      :style="cmpt_imgStyle" />
  </div>

</template>

<script>
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_IMAGEUPLOAD,
  PROJET_ATTR_SELECT
} from '../../model/attr.editor';
import createComponent from '../../model/create-component';

export default createComponent({
  name: 'ProjetImage',

  props: {
    title: {
      type: String,
      default: '这是一张图片',
      editor: {
        label: '文本内容',
        type: PROJET_ATTR_STRING
      }
    },
    src: {
      type: String,
      default: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123624/24/2195/99979/5ec3a165E12b276e2/2e5b8a2606fbabfe.jpg!q70.jpg.dpg',
      // default: 'https://dummyimage.com/800x300.jpg',
      editor: {
        label: '图片链接',
        type: PROJET_ATTR_IMAGEUPLOAD
      }
    },
    fit: {
      type: String,
      default: 'fill',
      editor: {
        label: '展现方式',
        type: PROJET_ATTR_SELECT,
        options: [
          {
            label: '拉伸',
            value: 'fill'
          },
          {
            label: '保持原有尺寸比例',
            value: 'contain'
          }
        ]
      }
    }
  },

  computed: {
    cmpt_style () {
      return Object.assign(
        {},
        this.css,
        {
          // 解决弹性垂直方向：图片不能等分
          overflow: 'hidden'
        }
      );
    },
    cmpt_imgStyle () {
      return {
        objectFit: this.fit
      };
    }
  },

  defaultCss: {
    width: 375,
    height: 100
  }
});
</script>

<style lang="scss" scoped>
.projet-img {
  display: block;
  width: 100%;
  height: 100%;

  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
