<template>
  <div id="app">
    <navbar class="ss-navbar is-fixed-top" />
    <main>
      <keep-alive include="home">
        <router-view class="router-view-content" />
      </keep-alive>
    </main>
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

  main {
    flex-grow: 1;
  }
}
</style>
