<template>
  <div class="container max-w-screen-md py-6 px-3">
    <alert type="info" class="mb-4">
      You are being redirected.
      <a :href="to" class="text-nord10 underline"
        >Click here if you're not being redirected automatically</a
      >.
    </alert>
    <div class="progress flex h-2 flex-row"></div>
  </div>
</template>

<script>
const { VITE_APP_WIKI } = import.meta.env;
import Alert from '@/components/Alert.vue';
import { computed } from '@vue/composition-api';

export default {
  components: { Alert },
  beforeRouteEnter(to, from, next) {
    window.location.replace(`${VITE_APP_WIKI}${to.fullPath}`);
    next();
  },
  setup() {
    const to = computed(() => `${VITE_APP_WIKI}${this.$route.fullPath}`);

    return {
      to,
    };
  },
};
</script>
