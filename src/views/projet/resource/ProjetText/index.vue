<template>
  <span class="projet-text"
    :style="cmpt_style">
    {{title}}
  </span>
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
          display: 'inline-block',
          backgroundImage: `url(${this.img})`,
          color: this.color
        });
    }
  },

  defaultCss: {
    width: '200',
    wordBreak: 'break-all'
  }
});
</script>

<style lang="scss" scoped>
.projet-text {
  position: relative;
  text-decoration: inherit;
}
</style>
