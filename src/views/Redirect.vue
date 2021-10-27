<template>
  <div class="container py-6 px-3 max-w-screen-md">
    <alert type="info" class="mb-4">
      You are being redirected.
      <a :href="to" class="text-nord10 underline"
        >Click here if you're not being redirected automatically</a
      >.
    </alert>
    <div class="progress h-2 flex flex-row"></div>
  </div>
</template>

<script>
const { VITE_APP_WIKI } = import.meta.env;
import Alert from '@/components/Alert.vue';
import { computed } from '@vue/composition-api';

export default {
  components: { Alert },
  setup() {
    const to = computed(() => `${VITE_APP_WIKI}${this.$route.fullPath}`);

    return {
      to
    };
  },
  beforeRouteEnter(to, from, next) {
    window.location.replace(`${VITE_APP_WIKI}${to.fullPath}`);
    next();
  }
};
</script>
