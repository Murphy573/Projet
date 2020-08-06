<template>
  <div class="projet-text"
    :style="cmpt_style">
    {{title}}
  </div>
</template>

<script>
import { PROJET_ATTR_STRING } from '../../model/attr.editor';
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
