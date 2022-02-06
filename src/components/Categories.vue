<template>
  <div class="categories flex w-64 flex-col">
    <span
      v-if="showLabel"
      class="label mb-1 text-xs uppercase text-nord0 dark:text-nord6"
      >Categories</span
    >
    <button
      v-for="(category, i) in categories"
      :key="i"
      class="btn m-px rounded py-2 px-4 pl-8 text-left text-nord0 dark:text-nord6"
      :class="{ active: category.hash === active }"
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
      default: () => '',
    },
    categories: {
      type: Array,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: () => true,
    },
  },
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
    @apply shadow-md;
  }
}
</style>
