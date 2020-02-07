<template>
  <div id="app">
    <navbar class="ss-navbar is-fixed-top" />
    <keep-alive include="home">
      <router-view class="router-view-content" />
    </keep-alive>
    <ss-footer class="ss-footer" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    "ss-footer": Footer
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  .router-view-content {
    padding-top: $navbar-height;
    flex-grow: 1;
  }
}
</style>
