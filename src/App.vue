<template>
  <div id="app" class="flex min-h-screen flex-col">
    <navbar
      class="absolute top-0 left-0 right-0 z-10"
      :class="{ 'dark:bg-gray-800': !isHome, 'bg-white': !isHome }"
      :transparant="isTransparant"
    />
    <main
      class="z-0 flex-grow bg-nord4 dark:bg-nord0"
      :class="{
        'has-fixed-navbar': !isHome,
      }"
    >
      <keep-alive :include="['Home', 'Player', 'Run']">
        <router-view />
      </keep-alive>
    </main>
    <my-footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import { computed } from '@vue/composition-api';
import { useEventListener } from '@vueuse/core';

export default {
  metaInfo: {
    title: 'SpeedSouls',
    titleTemplate: '%s - SpeedSouls',
    meta: [
      {
        name: 'description',
        content:
          'SpeedSouls was established in September 2014 as a community hub for people seeking information about speedrunning the various FROMSoftware Souls games. With the availability of Discord about a year later, we have formed a community for everyone interested. Nowadays, SpeedSouls is one of the largest groups focused on speedrunning a single game series.',
      },
    ],
  },
  components: { Navbar, MyFooter },
  setup(props, { root }) {
    const isHome = computed(() => root.$route.name === 'Home');
    const isTransparant = computed(() => isHome.value);

    useEventListener(window, 'focus', () => {
      if (root.$store.getters.theme === 'AUTO')
        root.$store.dispatch('enableAuto');
    });

    return {
      isHome,
      isTransparant,
    };
  },
};
</script>
