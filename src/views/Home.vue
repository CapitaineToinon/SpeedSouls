<template>
  <div class="home flex items-center justify-center h-2/3" :style="style">
    <div class="py-10 px-2 max-w-screen-md text-center">
      <div class="flex flex-row justify-center py-6">
        <img :src="require('@/assets/flame.png')" alt="speedsouls logo" />
      </div>
      <h1 class="text-5xl font-semibold text-gray-100 leading-none">
        Welcome!
      </h1>
      <p class="text-xl text-gray-100 font-normal py-6">
        Thanks for stopping by. We're currently working on getting our frontpage
        up and running. In the meantime, follow one of the links below to get to
        the content you're looking for.
      </p>
      <div class="flex flex-col items-center sm:justify-center sm:flex-row">
        <router-link
          class="btn bg-nord10 mx-1 border-nord9 text-nord6 font-bold py-2 px-4 border-b-4 rounded"
          tag="button"
          :to="{ name: 'Games' }"
        >
          <font-awesome-icon class="mr-3" :icon="['fas', 'list']" />Leaderboards
        </router-link>
        <button
          class="btn bg-nord10 mx-1 border-nord9 text-nord6 font-bold py-2 px-4 border-b-4 rounded"
        >
          <font-awesome-icon
            class="mr-3"
            :icon="['fas', 'angle-double-right']"
          />SpeedSouls Wiki
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
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
    @apply opacity-75;
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
