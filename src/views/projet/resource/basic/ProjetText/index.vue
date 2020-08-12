<template>
  <span class="projet-text"
    :style="cmpt_style">
    {{title}}
  </span>
</template>

<script>
import { PROJET_ATTR_STRING } from '@/views/projet/model/attr.editor';
import createComponent from '@/views/projet/model/create-component';

export default createComponent({
  name: 'ProjetText',
  // 左侧面板展示名称
  dispayLabel: '文本',
  // 左侧面板展示icon
  displayIconfont: 'iconwenben',

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
    width: 100,
    height: 40,
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
