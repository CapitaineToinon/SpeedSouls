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
import Navbar from "./components/Navbar";
import MyFooter from "./components/MyFooter";
import { mapState, mapActions } from "vuex";

export default {
  components: { Navbar, MyFooter },
  computed: {
    ...mapState(["dark", "theme"]),
    isHome() {
      return this.$route.name === "Home";
    },
    transparant() {
      return this.isHome;
    }
  },
  methods: {
    ...mapActions(["enableAuto"]),
    onFocus() {
      if (this.theme === "AUTO") {
        this.enableAuto();
      }
    }
  },
  created() {
    window.addEventListener("focus", this.onFocus, false);
  },
  destroyed() {
    window.removeEventListener("focus", this.onFocus, false);
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";

html,
body {
  min-height: 100vh;
}

html,
body,
main {
  max-width: 100vw;
}

:root {
  --navbar-height: 3rem;
}

.has-fixed-navbar {
  padding-top: var(--navbar-height);
}

.min-h-screen-navbar {
  min-height: calc(100vh - var(--navbar-height));
}

.top-0-navbar {
  top: var(--navbar-height);
}
</style>
