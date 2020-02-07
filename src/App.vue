<template>
  <div id="app">
    <navbar class="ss-navbar is-fixed-top" />
    <keep-alive include="home">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
body {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}
</style>
