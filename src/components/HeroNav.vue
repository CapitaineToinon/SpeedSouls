<template>
  <section class="hero" :style="style">
    <div class="hero-body">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    // todo other backgrounds
    assets: ["bloodborne.png", "darksouls3.jpg"]
  }),
  props: {
    navbarClass: {
      type: String,
      default: ""
    }
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
