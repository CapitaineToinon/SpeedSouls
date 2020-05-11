<template>
  <div class="container text-nord0 dark:text-nord6 max-w-screen-sm">
    <h1 class="text-4xl text-center mb-6">Settings</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          class="block uppercase tracking-wide text-xs font-bold mb-2"
          for="theme"
          >Theme</label
        >
        <theme-switcher id="theme" class="h-10" />
      </div>
      <div>
        <label
          class="block uppercase tracking-wide text-xs font-bold mb-2"
          for="time"
          >Time reference</label
        >
        <time-reference id="time" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TimeReference from '@/components/TimeReference';

export default {
  metaInfo: {
    title: 'Settings'
  },
  components: { ThemeSwitcher, TimeReference }
};
</script>
