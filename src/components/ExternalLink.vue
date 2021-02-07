<template>
  <a
    :href="href"
    class="border-b border-dotted border-nord0"
    target="_blank"
    rel="noopener"
  >
    <slot></slot>
    <font-awesome-icon
      v-if="icon"
      class="ml-1"
      :icon="['fas', 'external-link-alt']"
    />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String
    },
    icon: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>
