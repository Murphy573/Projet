<template>
  <div class="project-page">
    {{title}}
    <slot></slot>
  </div>
</template>

<script>
import { PROJET_ATTR_STRING } from '../../model/attr.editor';
import createComponent from '../../model/create-component';

export default createComponent({
  name: 'ProjetPage',

  props: {
    title: {
      type: String,
      default: '根页面标题',
      editor: {
        label: '页面标题',
        type: PROJET_ATTR_STRING
      }
    }
  },
  defaultCss: {
    height: 'auto'
  }
}, true);
</script>

<style lang="scss" scoped>
.project-page {
  position: relative;
}
</style>
