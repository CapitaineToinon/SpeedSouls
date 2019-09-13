<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
body,
#app {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
