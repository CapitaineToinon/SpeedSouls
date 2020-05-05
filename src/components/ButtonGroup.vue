<template>
  <div class="btn-group border-nord0 dark:border-nord6">
    <button
      v-for="(option, i) in options"
      :key="i"
      @click="$emit('change', i)"
      class="btn theme whitespace-no-wrap"
      :class="{
        'bg-nord0 text-nord6 dark:bg-nord6 dark:text-nord0': active === i,
        'bg-nord6 text-nord0 dark:bg-nord1 dark:text-nord6': active !== i
      }"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    options: {
      value: [Array, Object],
      default: () => []
    },
    active: {}
  },
  computed: {
    ...mapState(["theme"])
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  @apply border;
  @apply rounded-sm;
  @apply flex;
  @apply flex-row;
  @apply justify-center;
  @apply items-stretch;

  .btn.theme {
    @apply flex-1;
    @apply font-semibold;
    @apply py-2;
    @apply px-4;
  }
}
</style>
