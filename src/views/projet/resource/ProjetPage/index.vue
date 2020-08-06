<template>
  <div class="project-page">
    {{title}}
    <slot></slot>
  </div>
</template>

<script>
import { PROJET_ATTR_STRING } from '../../model/attr.editor';

export default {
  name: 'ProjetPage',

  props: {
    title: {
      type: String,
      default: '根页面标题',
      editor: {
        label: '页面标题',
        type: PROJET_ATTR_STRING
      }
    },
    elements: {
      type: Array,
      default () {
        return [];
      },
      editor: false
    }
  },
  defaultCss: {
    height: 'auto'
  }
};
</script>

<style lang="scss" scoped>
.project-page {
  position: relative;
}
</style>
