<template>
  <div class="container px-0 pb-6 text-left" :class="{ hidden }">
    <Alert type="speedsouls" class="w-full mx-auto">
      <template v-slot:header>SpeedSouls Charity Marathon</template>
      📅It's HERE! SpeedSouls Charity Marathon 2020 schedule! 🔥
      <a class="underline" href="https://horaro.org/scm/2020"
        >https://horaro.org/scm/2020</a
      >
      and will be livestreamed on
      <a class="underline" href="https://twitch.tv/speedsouls">
        SpeedSouls's Twitch channel</a
      >.
    </Alert>
  </div>
</template>

<script>
const { VITE_APP_ENABLE_SITE_NOTICE } = import.meta.env;;
import Alert from '@/components/Alert.vue';
import { computed } from '@vue/composition-api';

export default {
  components: { Alert },
  setup() {
    return {
      hidden: computed(() => VITE_APP_ENABLE_SITE_NOTICE === 'false')
    };
  }
};
</script>
