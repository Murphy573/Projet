<template>
  <div class="projet-layout-content">
    <MainLeft />
    <MainCenter />
    <MainRight />
  </div>
</template>

<script>
import MainLeft from './left';
import MainCenter from './center';
import MainRight from './right';

export default {
  name: 'ProjetLayoutContent',

  components: { MainLeft, MainCenter, MainRight }
};
</script>

<style lang="scss" scoped>
.projet-layout-content {
  display: flex;
  height: 700px;
}
</style>
