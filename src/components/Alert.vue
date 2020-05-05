<template>
  <div role="alert" :class="type">
    <div class="title font-bold rounded-t px-4 py-2">
      <slot name="header">{{ type }}</slot>
    </div>
    <div class="content border border-t-0 rounded-b px-4 py-3">
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
      default: () => "information",
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
div[role="alert"] {
  @apply shadow-lg;

  .title:first-letter {
    @apply uppercase;
  }

  .content {
    @apply bg-nord6;
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
      @apply text-nord0;
    }

    .content {
      @apply border-nord13;
      @apply bg-gray-100;
      @apply text-nord0;
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
      @apply text-nord0;
    }

    .content {
      @apply border-nord14;
    }
  }
}

:root.mode-dark div[role="alert"].information {
  .title {
    @apply bg-nord1;
    @apply text-nord6;
  }
  .content {
    @apply bg-nord6;
    @apply text-nord0;
    @apply border-nord0;
  }
}

:root:not(.mode-dark) div[role="alert"].information {
  .title {
    @apply bg-nord5;
    @apply text-nord0;
  }
  .content {
    @apply bg-nord6;
    @apply text-nord0;
    @apply border-nord5;
  }
}
</style>
