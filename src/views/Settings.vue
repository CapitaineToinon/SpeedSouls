<template>
  <div class="container max-w-screen-sm py-6 px-3 text-nord0 dark:text-nord6">
    <h1 class="mb-6 text-center text-4xl font-bold text-nord0 dark:text-nord6">
      Settings
    </h1>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="flex flex-col justify-between">
        <label
          class="mb-2 block text-xs font-bold uppercase tracking-wide"
          for="theme"
          >Theme</label
        >
        <theme-switcher id="theme" />
      </div>
      <div class="flex flex-col justify-between">
        <label
          class="mb-2 block text-xs font-bold uppercase tracking-wide"
          for="time"
          >Time reference</label
        >
        <time-reference id="time" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import TimeReference from '@/components/TimeReference.vue';

export default {
  metaInfo: {
    title: 'Settings',
  },
  components: { ThemeSwitcher, TimeReference },
};
</script>
