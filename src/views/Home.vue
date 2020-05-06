<template>
  <div class="min-h-screen">
    <hero class="home h-screen md:h-auto shadow-md" :style="style">
      <div class="max-w-screen md mx-auto text-center">
        <img
          class="mx-auto"
          :src="require('@/assets/flame.png')"
          alt="speedsouls logo"
        />
        <h1 class="text-5xl font-semibold text-gray-100 leading-none">
          Welcome on SpeedSouls
        </h1>
        <!-- <p
          class="text-base sm:text-lg text-gray-100 font-normal py-6"
        ></p>-->
        <div
          class="flex flex-col items-stretch max-w-md mx-auto items-center justify-center sm:flex-row"
        >
          <router-link
            class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
            tag="button"
            :to="{ name: 'Games' }"
          >
            <font-awesome-icon
              class="mr-3"
              :icon="['fas', 'list']"
            />Leaderboards
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
    </hero>
    <hero class="bg-nord5 text-nord0 dark:bg-nord0 dark:text-nord6 py-24">
      <div class="max-w-screen-md text-center mx-auto">
        <h1 class="text-4xl text-center py-0">About us</h1>
        <p class="text-base py-6 text-center">
          SpeedSouls was established in September 2014 as an information hub for
          people seeking information about speedrunning the various FromSoftware
          Souls games. With the availability of Discord about a year later, we
          have formed a community for everyone interested. Nowadays, SpeedSouls
          is one of the largest groups focused on speedrunning a single game
          series.
        </p>
        <a
          class="border border-nord0 py-2 px-4 rounded"
          :href="`${VUE_APP_WIKI}/SpeedSouls:About`"
          >More</a
        >
      </div>
    </hero>
    <hero class="bg-nord4 text-nord0 dark:bg-nord1 dark:text-nord6 py-24">
      <div
        class="max-w-screen-md mx-auto flex flex-row items-center justify-evenly"
      >
        <div class="px-4 text-center">
          <h1 class="text-4xl text-center py-0">Join the community</h1>
          <p class="text-base py-4 text-center">
            Join discord to ask some help where more than 5000 members are
            waiting for you!
          </p>

          <alert type="warning" headless class="text-left mb-4">
            Please note that it is not a Discord server to request co-op in or
            for extensive talk about casual Souls topics. This Discord is used
            to discuss Souls speedrunning only.
          </alert>

          <discord class="max-w-md mx-auto" />
        </div>
      </div>
    </hero>
    <hero class="bg-nord5 text-nord0 dark:bg-nord2 dark:text-nord6 py-24">
      <div class="max-w-md text-center mx-auto">
        <h1 class="text-4xl text-center py-0">Help us financially</h1>
        <p class="text-base py-4 text-center">
          Give us money on patreon and get your own role on our Discord server!
        </p>

        <router-link
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
          tag="button"
          :to="{ name: 'Submit' }"
        >
          <font-awesome-icon class="mr-3" :icon="['fab', 'patreon']" />Open
          Patreon
        </router-link>
      </div>
    </hero>
    <hero class="bg-nord4 text-nord0 dark:bg-nord0 dark:text-nord6 py-24">
      <div class="max-w-md text-center mx-auto">
        <h1 class="text-4xl py-0">Looking for a guide</h1>
        <p class="text-base py-4">
          What you're looking for is problably on the wiki
        </p>
        <router-link
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
          tag="button"
          :to="{ name: 'Submit' }"
        >
          <font-awesome-icon
            class="mr-3"
            :icon="['fas', 'angle-double-right']"
          />SpeedSouls Wiki
        </router-link>
      </div>
    </hero>
    <hero class="bg-nord5 text-nord0 dark:bg-nord1 dark:text-nord6 py-24">
      <div class="max-w-md text-center mx-auto">
        <h1 class="text-4xl">Submit a run</h1>
        <p class="text-base py-4">
          Want to have your own speedrun on the site?
        </p>
        <router-link
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
          tag="button"
          :to="{ name: 'Submit' }"
          >Submit a run</router-link
        >
      </div>
    </hero>
    <hero class="bg-nord4 text-nord0 dark:bg-nord2 dark:text-nord6 py-24">
      <div class="max-w-md text-center mx-auto">
        <h1 class="text-4xl py-0">Found a bug</h1>
        <p class="text-base py-4">
          If you found a bug with the website, please open an issue about it on
          our github page.
        </p>
        <a
          :href="`${VUE_APP_GITHUB}/issues`"
          class="btn shadow-md mb-1 bg-nord0 mx-1 border-nord13 border text-nord13 font-bold py-2 px-4 rounded"
          tag="button"
          :to="{ name: 'Submit' }"
        >
          <font-awesome-icon class="mr-3" :icon="['fab', 'github']" />Open in
          issue
        </a>
      </div>
    </hero>
  </div>
</template>

<script>
const { VUE_APP_WIKI, VUE_APP_GITHUB } = process.env;
import { mapState } from "vuex";
import Alert from "@/components/Alert";
import Hero from "@/components/Hero";
import Discord from "@/components/Discord";

export default {
  components: { Alert, Hero, Discord },
  data: () => ({
    VUE_APP_WIKI,
    VUE_APP_GITHUB,
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
    ...mapState(["dark"]),
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
  min-height: 75vh;
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
