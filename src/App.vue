<template>
  <div id="app" class="h-screen flex flex-col">
    <navbar
      class="absolute top-0 left-0 right-0 z-10"
      :class="{ 'dark:bg-gray-800': !isHome, 'bg-white': !isHome }"
      :transparant="transparant"
    />
    <main
      class="flex-grow z-0 bg-nord4 dark:bg-nord0"
      :class="{ 'has-fixed-navbar': !isHome }"
    >
      <keep-alive :include="['Home', 'Player', 'Run']">
        <router-view />
      </keep-alive>
    </main>
    <my-footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import MyFooter from './components/MyFooter';
import { mapState, mapActions } from 'vuex';

export default {
  metaInfo: {
    title: 'SpeedSouls',
    titleTemplate: '%s - SpeedSouls',
    meta: [
      {
        name: 'description',
        content:
          'SpeedSouls was established in September 2014 as a community hub for people seeking information about speedrunning the various FROMSoftware Souls games. With the availability of Discord about a year later, we have formed a community for everyone interested. Nowadays, SpeedSouls is one of the largest groups focused on speedrunning a single game series.'
      }
    ]
  },
  components: { Navbar, MyFooter },
  computed: {
    ...mapState(['dark', 'theme']),
    isHome() {
      return this.$route.name === 'Home';
    },
    transparant() {
      return this.isHome;
    }
  },
  methods: {
    ...mapActions(['enableAuto']),
    onFocus() {
      if (this.theme === 'AUTO') {
        this.enableAuto();
      }
    }
  },
  created() {
    window.addEventListener('focus', this.onFocus, false);
  },
  destroyed() {
    window.removeEventListener('focus', this.onFocus, false);
  }
};
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
