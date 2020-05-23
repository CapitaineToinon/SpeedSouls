<template>
  <div class="min-h-screen">
    <hero class="home h-screen md:h-auto shadow-md" :style="style">
      <div class="max-w-2xl md mx-auto text-center py-40">
        <img
          class="mx-auto mb-4"
          :src="require('@/assets/SpeedSouls-Horizontal-White_with_motto.png')"
          alt="speedsouls logo"
        />
        <div
          class="flex flex-col items-stretch mx-auto items-center justify-center sm:flex-row"
        >
          <router-link
            class="btn -primary"
            tag="button"
            :to="{ name: 'Games' }"
          >
            <font-awesome-icon
              class="mr-1"
              :icon="['fas', 'list']"
            />Leaderboards
          </router-link>
          <a :href="VUE_APP_WIKI" class="btn -primary">
            <font-awesome-icon
              class="mr-1"
              :icon="['fas', 'angle-double-right']"
            />SpeedSouls Wiki
          </a>
          <a :href="VUE_APP_DISCORD" class="btn -primary">
            <font-awesome-icon class="mr-1" :icon="['fab', 'discord']" />Discord
          </a>
        </div>
      </div>
    </hero>
    <hero class="bg-nord5 text-nord0 dark:bg-nord0 dark:text-nord6 py-24">
      <div class="max-w-screen-md text-center mx-auto">
        <h1 class="text-4xl text-center py-0">About Us</h1>
        <p class="text-base py-6 text-center">
          SpeedSouls was established in September 2014 as a community hub for
          people seeking information about speedrunning the various FROMSoftware
          Souls games. With the availability of Discord about a year later, we
          have formed a community for everyone interested. Nowadays, SpeedSouls
          is one of the largest groups focused on speedrunning a single game
          series.
		  <br />
        </p>
		
        <a class="btn -primary" :href="`${VUE_APP_WIKI}/SpeedSouls:About`"
          >More</a
        >
      </div>
    </hero>
    <hero class="bg-nord4 text-nord0 dark:bg-nord1 dark:text-nord6 py-24">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-evenly">
        <div class="px-4 text-center">
          <h1 class="text-4xl text-center py-0">Join The Community</h1>
          <p class="text-base py-4 text-center">
            Join our Discord server where nearly 5000 members are waiting for you!
			Ask questions and receive answers from veteran runners, and share your accomplishments and ideas with the community!
			Note however, that co-op requests and extensive casual discussions do not belong there. Do please choose a different Discord server for those topics.
			<br />
          </p>

          <discord class="max-w-md mx-auto" />
        </div>
      </div>
    </hero>
    <hero class="bg-nord5 text-nord0 dark:bg-nord2 dark:text-nord6 py-24">
      <div class="max-w-screen-md text-center mx-auto">
        <h1 class="text-4xl text-center py-0">Patreon</h1>
        <p class="text-base py-4 text-center">
          If you'd like to give back a bit for the upkeep and work put into the site, then feel free to visit our Patreon.
		  Patreon Supporters receive their own special role on our Discord server. 
		  <br />
        </p>

        <a :href="VUE_APP_PATREON" class="btn -primary">
          <font-awesome-icon class="mr-3" :icon="['fab', 'patreon']" />Open
          Patreon
        </a>
      </div>
    </hero>
  </div>
</template>

<script>
const {
  VUE_APP_WIKI,
  VUE_APP_DISCORD,
  VUE_APP_GITHUB,
  VUE_APP_PATREON
} = process.env;
import { mapState } from 'vuex';
import Hero from '@/components/Hero';
import Discord from '@/components/Discord';

export default {
  metaInfo: {
    title: 'SpeedSouls',
    titleTemplate: null
  },
  components: { Hero, Discord },
  data: () => ({
    VUE_APP_WIKI,
    VUE_APP_GITHUB,
    VUE_APP_DISCORD,
    VUE_APP_PATREON,
    assets: [
      'bloodborne',
      'darksouls',
      'darksouls2',
      'darksouls3',
      'darksoulsremastered',
      'darksouls2sotfs',
      'demonssouls'
    ]
  }),
  computed: {
    ...mapState(['dark']),
    style() {
      const image = this.assets[Math.floor(Math.random() * this.assets.length)];
      const url = require(`@/assets/backgrounds/${image}-1280.jpg`);

      return {
        '--bg-url': `url(${url})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.letter-spacing-px {
  letter-spacing: 1px;
}

.home {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    background-color: black;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -11;
  }

  &::after {
    content: '';
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
