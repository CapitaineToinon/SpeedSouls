<template>
  <span class="text-nord3 dark:text-nord4">
    Data retrieved from
    <a :href="VUE_APP_SPEEDRUNCOM">speedrun.com</a>.
  </span>
</template>

<script>
const { VUE_APP_SPEEDRUNCOM } = import.meta.env;

export default {
  data: () => ({
    VUE_APP_SPEEDRUNCOM,
  }),
};
</script>
