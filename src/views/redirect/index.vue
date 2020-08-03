<script>
import { getRedirectRouter } from '@/utils/redirect';

export default {
  created () {
    const _redirectRouter = getRedirectRouter();
    if (!_redirectRouter) return;
    this.$router.replace(_redirectRouter);
  },
  render: function (h) {
    return h(); // avoid warning message
  }
};
</script>
