<template>
  <div class="min-h-screen">
    <hero
      class="home min-h-screen md:min-h-0 shadow-md has-fixed-navbar"
      :style="style"
    >
      <SiteNotice />
      <div class="max-w-2xl md mx-auto text-center py-6 md:py-40">
        <img
          class="mx-auto mb-4"
          src="/assets/SpeedSouls-Horizontal-White_with_motto.png"
          alt="speedsouls logo"
        />
        <div class="links py-5">
          <router-link
            class="btn -primary"
            tag="button"
            :to="{ name: 'Games' }"
          >
            <font-awesome-icon :icon="['fas', 'list']" />Leaderboards
          </router-link>
          <a :href="VITE_APP_WIKI" class="btn -primary">
            <font-awesome-icon
              :icon="['fas', 'angle-double-right']"
            />SpeedSouls Wiki
          </a>
          <router-link
            class="btn -primary"
            tag="button"
            :to="{ name: 'Submit' }"
          >
            <font-awesome-icon :icon="['fas', 'hourglass-end']" />Submit a Run
          </router-link>
          <a :href="VITE_APP_DISCORD" class="btn -primary">
            <font-awesome-icon :icon="['fab', 'discord']" />Discord
          </a>
        </div>
      </div>
    </hero>
    <hero class="hero bg-nord5 text-nord0 dark:bg-nord0 dark:text-nord6">
      <div class="max-w-screen-md text-center mx-auto">
        <h1 class="text-4xl font-bold text-center py-0">About Us</h1>
        <p class="text-base py-8 text-center">
          SpeedSouls was established in September 2014 as a community hub for
          people seeking information about speedrunning the various FROMSoftware
          Souls games. With the availability of Discord about a year later, we
          have formed a community for everyone interested. Nowadays, SpeedSouls
          is one of the largest groups focused on speedrunning a single game
          series.
        </p>

        <div class="flex flex-row px-2 py-2 justify-center">
          <a class="btn -primary" :href="`${VITE_APP_WIKI}/SpeedSouls:About`"
            >Read More</a
          >
        </div>
      </div>
    </hero>
    <hero class="hero bg-nord4 text-nord0 dark:bg-nord1 dark:text-nord6">
      <div
        class="max-w-screen-md mx-auto flex flex-row items-center justify-evenly"
      >
        <div class="px-4 text-center">
          <h1 class="text-4xl font-bold text-center leading-none">
            Join The Community
          </h1>
          <p class="text-center py-8">
            Join our Discord server where nearly 5000 members are waiting for
            you! Ask questions and receive answers from veteran runners, and
            share your accomplishments and ideas with the community! Note
            however, that co-op requests and extensive casual discussions do not
            belong there. Do please choose a different Discord server for those
            topics.
          </p>

          <div class="flex flex-row px-2 py-2 justify-center">
            <discord />
          </div>
        </div>
      </div>
    </hero>
    <hero class="hero bg-nord5 text-nord0 dark:bg-nord2 dark:text-nord6">
      <div class="max-w-screen-md text-center mx-auto">
        <h1 class="text-4xl font-bold text-center py-0">Patreon</h1>
        <p class="text-base py-8 text-center">
          If you'd like to give back a bit for the upkeep and work put into the
          site, then feel free to visit our Patreon. Patreon Supporters receive
          their own special role on our Discord server.
        </p>

        <div class="flex flex-row px-2 py-2 justify-center">
          <a :href="VITE_APP_PATREON" class="btn -primary">
            <font-awesome-icon class="mr-3" :icon="['fab', 'patreon']" />Open
            Patreon
          </a>
        </div>
      </div>
    </hero>
  </div>
</template>

<script>
const {
  VITE_APP_WIKI,
  VITE_APP_DISCORD,
  VITE_APP_GITHUB,
  VITE_APP_PATREON
} = import.meta.env;

import SiteNotice from '@/components/SiteNotice.vue';
import Hero from '@/components/Hero.vue';
import Discord from '@/components/Discord.vue';
import { computed, reactive, toRefs } from '@vue/composition-api';

export default {
  metaInfo: {
    title: 'SpeedSouls',
    titleTemplate: null
  },
  components: { SiteNotice, Hero, Discord },
  setup(props, { root }) {
    const state = reactive({
      VITE_APP_WIKI,
      VITE_APP_GITHUB,
      VITE_APP_DISCORD,
      VITE_APP_PATREON,
      assets: [
        'bloodborne',
        'darksouls',
        'darksouls2',
        'darksouls3',
        'darksoulsremastered',
        'darksouls2sotfs',
        'demonssouls'
      ]
    });

    const dark = computed(() => root.$store.getters.dark);
    const style = computed(() => {
      const image =
        state.assets[Math.floor(Math.random() * state.assets.length)];

      return {
        '--bg-url': `url(/assets/backgrounds/${image}-1280.jpg)`
      };
    });

    return {
      ...toRefs(state),
      dark,
      style
    };
  }
};
</script>

<style lang="scss" scoped>
.letter-spacing-px {
  letter-spacing: 1px;
}

.hero {
  @apply py-24;
}

.home {
  position: relative;
  overflow: hidden;

  .links {
    @apply flex;
    @apply flex-wrap;
    @apply flex-row;
    @apply justify-between;
    --gap: 10px;

    .btn {
      width: 100%;
      margin-bottom: var(--gap);

      svg {
        @apply mr-1;
      }

      @screen sm {
        width: calc(50% - (var(--gap) / 2));
      }
    }
  }

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
