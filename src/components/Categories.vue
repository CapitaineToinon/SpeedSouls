<template>
  <div class="categories w-64 flex flex-col">
    <span
      v-if="showLabel"
      class="label text-xs text-nord0 dark:text-nord6 uppercase mb-1"
      >Categories</span
    >
    <button
      class="btn text-nord0 dark:text-nord6 text-left py-2 pl-8 px-4 m-px rounded"
      :class="{ active: category.hash === active }"
      v-for="(category, i) in categories"
      :key="i"
      @click="$emit('click', category)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: () => ""
    },
    categories: {
      type: Array,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  letter-spacing: 1px;
}
.btn {
  &.active,
  &:hover {
    @apply text-gray-100;
    @apply bg-nord10;
    @apply shadow-xs;
  }
}
</style>
