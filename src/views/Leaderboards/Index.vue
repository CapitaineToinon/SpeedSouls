<template>
  <div class="container py-6 px-3" :class="{ 'min-h-screen-navbar': isGame }">
    <site-notice />
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  setup(props, { root }) {
    const isGame = computed(() => root.$route.name === 'Game');

    return {
      isGame
    };
  }
};
</script>
