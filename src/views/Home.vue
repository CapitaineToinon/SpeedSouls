<template>
  <div
    class="home flex items-center justify-center h-screen sm:h- shadow-md"
    :style="style"
  >
    <div class="py-10 px-2 max-w-lg text-center">
      <div class="flex flex-row justify-center py-6">
        <img :src="require('@/assets/flame.png')" alt="speedsouls logo" />
      </div>
      <h1 class="text-5xl font-semibold text-gray-100 leading-none">
        Welcome!
      </h1>
      <p class="text-base sm:text-lg text-gray-100 font-normal py-6">
        Thanks for stopping by. We're currently working on getting our frontpage
        up and running. In the meantime, follow one of the links below to get to
        the content you're looking for.
      </p>
      <div
        class="flex flex-col items-stretch max-w-md mx-auto items-center justify-center sm:flex-row"
      >
        <router-link
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
          tag="button"
          :to="{ name: 'Games' }"
        >
          <font-awesome-icon class="mr-3" :icon="['fas', 'list']" />Leaderboards
        </router-link>
        <a
          :href="VUE_APP_WIKI"
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
        >
          <font-awesome-icon
            class="mr-3"
            :icon="['fas', 'angle-double-right']"
          />SpeedSouls Wiki
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const { VUE_APP_WIKI } = process.env;

export default {
  name: "Home",
  data: () => ({
    VUE_APP_WIKI,
    assets: [
      "bloodborne",
      "darksouls",
      "darksouls2",
      "darksouls3",
      "darksoulsremastered",
      "darksouls2sotfs",
      "demonssouls"
    ]
  }),
  computed: {
    style() {
      const image = this.assets[Math.floor(Math.random() * this.assets.length)];
      const url = require(`@/assets/backgrounds/${image}-1280.jpg`);

      return {
        "--bg-url": `url(${url})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  overflow: hidden;
  padding-bottom: var(--navbar-height);

  &::before {
    content: "";
    background-color: black;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -11;
  }

  &::after {
    content: "";
    @apply opacity-50;
    transform: scale(1.1);
    background-image: var(--bg-url);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -10;
  }
}
</style>
