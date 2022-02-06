<template>
  <div role="alert" class="overflow-hidden" :class="type">
    <div v-if="!headless" class="title rounded-t px-4 py-2 font-bold">
      <slot name="header">{{ type }}</slot>
    </div>
    <div
      class="content border px-4 py-3"
      :class="{ 'rounded-b border-t-0': !headless, rounded: headless }"
    >
      <p>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => 'information',
      required: false,
    },
    headless: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
div[role='alert'] {
  @apply shadow-md;

  .title:first-letter {
    @apply uppercase;
  }

  .content {
    @apply bg-nord6 dark:bg-nord3;
    @apply text-nord1 dark:text-nord6;
  }

  &.danger {
    .title {
      @apply bg-nord11;
      @apply text-nord6;
    }

    .content {
      @apply border-nord11;
    }
  }

  &.warning {
    .title {
      @apply bg-nord13;
      @apply text-nord1;
    }

    .content {
      @apply border-nord13;
    }
  }

  &.info {
    .title {
      @apply bg-nord10;
      @apply text-nord6;
    }

    .content {
      @apply border-nord10;
    }
  }

  &.success {
    .title {
      @apply bg-nord14;
      @apply text-nord1;
    }

    .content {
      @apply border-nord14;
    }
  }

  &.speedsouls {
    .title {
      @apply bg-speedsouls;
      @apply text-nord6;
    }

    .content {
      @apply border-speedsouls;
    }
  }
}
</style>
