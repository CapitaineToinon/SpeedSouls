<template>
  <section class="hero" :style="style">
    <div class="hero-head">
      <navbar :class="navbarClass" />
    </div>
    <div class="hero-body">
      <slot />
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data: () => ({
    // todo other backgrounds
    assets: [
      "bloodborne.png",
      "darksouls3.jpg",
      "darksouls.png",
      "darksouls2.png",
      "darksouls2sotfs.png",
      "darksouls3ext.png",
      "darksoulsremastered.png",
      "demonssouls.png"
    ]
  }),
  props: {
    navbarClass: {
      type: String,
      default: ""
    }
  },
  components: {
    Navbar
  },
  computed: {
    style() {
      const image = this.assets[Math.floor(Math.random() * this.assets.length)];
      const url = require(`@/assets/backgrounds/${image}`);

      return {
        "--bg-url": `url(${url})`
      };
    }
  }
};
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::after {
    content: "";
    filter: blur(2px);
    transform: scale(1.1);
    background-image: var(--bg-url);
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -10;
  }
}
</style>
