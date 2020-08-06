<template>
  <div class="props-editor">
    <MyElScrollbar>

    </MyElScrollbar>
  </div>
</template>

<script>
import MyElScrollbar from '@/components/my-el-scrollbar';

export default {
  name: 'PropsEditor',

  mixins: [],

  components: { MyElScrollbar },

  props: {},

  data () {
    return {

    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.props-editor {
  height: 100%;
  overflow: hidden;
}
</style>
