<template>
  <div class="projet-text">
    {{title}}
  </div>
</template>

<script>
import { PROJET_ATTR_STRING } from '../../model/attr.editor';

export default {
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
  defaultCss: {
    width: 200,
    height: 50
  }
};
</script>

<style lang="scss" scoped>
.projet-text {
  position: relative;
}
</style>
