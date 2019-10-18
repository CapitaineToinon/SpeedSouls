<template>
  <div id="app">
    <Navbar />
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  data: () => ({
    cachedRoutes: [""]
  }),
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss">
body,
#app {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}
</style>
