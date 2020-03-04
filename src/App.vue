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
  --main-z-index: 10;
  --footer-height: 600px;

  main {
    min-height: 100vh;
    flex-grow: 1;
    z-index: var(--main-z-index);
    margin-bottom: var(--footer-height);
    background-color: $white;
    box-shadow: $card-shadow;
  }

  .ss-footer {
    z-index: var(--main-z-index - 1);
    height: var(--footer-height);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
