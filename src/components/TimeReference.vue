<template>
  <select
    v-model="selected"
    class="block h-10 w-full appearance-none rounded border border-nord0 bg-nord6 py-2 px-4 leading-tight dark:border-nord6 dark:bg-nord2"
  >
    <option value="0">Relative</option>
    <option value="1">Absolute</option>
  </select>
</template>

<script>
import { computed, watch, ref } from '@vue/composition-api';

export default {
  setup(props, { root }) {
    const relativeTime = computed(() => root.$store.getters.relativeTime);
    const selected = ref(relativeTime.value ? '0' : '1');

    watch(selected, (val) => {
      switch (val) {
        case '0':
          root.$store.dispatch('enableRelativeTime');
          break;
        case '1':
          root.$store.dispatch('disableRelativeTime');
          break;
      }
    });

    return {
      relativeTime,
      selected,
    };
  },
};
</script>
