<template>
  <nav
    class="flex h-12 justify-between bg-nord6 px-3 text-center font-sans dark:bg-nord1"
    :class="{ transparant: isTransparant, active: !hidden, dark: dark }"
  >
    <router-link to="/" class="flex h-full flex-col justify-center">
      <img
        v-show="isWhiteLogo"
        class="h-10 py-2 sm:h-10"
        src="/img/logo-white.png"
        alt="speedsouls white logo"
      />
      <img
        v-show="!isWhiteLogo"
        class="h-10 py-2 sm:h-10"
        src="/img/logo-black.png"
        alt="speedsouls black logo"
      />
    </router-link>
    <div class="burger flex flex-col justify-center lg:hidden">
      <button
        ref="burger"
        class="flex items-center rounded border px-3 py-2"
        @click="toggleMenu"
      >
        <svg
          class="h-3 w-3 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div ref="menu" class="menu">
      <ul class="links flex list-none flex-col lg:flex-row">
        <li class="menu-item">
          <router-link to="/">Home.</router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{ name: 'Games' }">Leaderboards.</router-link>
        </li>
        <li class="menu-item">
          <a :href="VITE_APP_WIKI">Wiki.</a>
        </li>
        <li class="menu-item">
          <router-link :to="{ name: 'Submit' }">Submit a run.</router-link>
        </li>
      </ul>
      <ul class="socials">
        <li
          class="menu-item icon"
          :class="{
            'border-nord0': !transparant,
            'dark:border-nord6': transparant,
          }"
        >
          <a
            :href="VITE_APP_DISCORD"
            aria-label="Discord"
            class="hover:text-discord"
          >
            <font-awesome-icon :icon="['fab', 'discord']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a
            :href="VITE_APP_PATREON"
            aria-label="Patreon"
            class="hover:text-patreon"
          >
            <font-awesome-icon :icon="['fab', 'patreon']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a
            :href="VITE_APP_TWITTER"
            aria-label="Twitter"
            class="hover:text-twitter"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a
            :href="VITE_APP_GITHUB"
            aria-label="Github"
            class="hover:text-nord10"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <router-link
            :to="{ name: 'Settings' }"
            aria-label="Settings"
            class="hover:text-nord10"
          >
            <font-awesome-icon :icon="['fas', 'cog']" size="2x" />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
const {
  VITE_APP_WIKI,
  VITE_APP_DISCORD,
  VITE_APP_PATREON,
  VITE_APP_TWITTER,
  VITE_APP_GITHUB,
} = import.meta.env;

import useBodyLock from '@/mixins/bodyLocker';
import { reactive, computed, toRefs, watch } from '@vue/composition-api';
import {
  useWindowScroll,
  useEventListener,
  onClickOutside,
} from '@vueuse/core';

export default {
  props: {
    transparant: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { root, refs }) {
    const state = reactive({
      VITE_APP_WIKI,
      VITE_APP_DISCORD,
      VITE_APP_PATREON,
      VITE_APP_TWITTER,
      VITE_APP_GITHUB,
      hidden: true,
    });

    const menu = computed(() => refs.menu);
    const { y } = useWindowScroll();
    const [lock, unlock] = useBodyLock();
    const dark = computed(() => root.$store.getters.dark);
    const isTransparant = computed(() => props.transparant && y.value < 100);
    const isWhiteLogo = computed(() => dark.value || isTransparant.value);

    // lock the body when navbar menu is opened
    watch(
      () => state.hidden,
      (value, old) => {
        if (value === old) return;
        !value ? lock() : unlock();
      }
    );

    // but close it on resize
    useEventListener(window, 'resize', () => {
      state.hidden = true;
    });

    // close the menu if clicked outside of it or the burger
    onClickOutside(menu, ({ target }) => {
      if (target === refs.burger || refs.burger.contains(target)) return;
      state.hidden = true;
    });

    // close the navbar on route change
    watch(
      () => root.$route.name,
      () => {
        state.hidden = true;
      }
    );

    function toggleMenu() {
      state.hidden = !state.hidden;
    }

    return {
      ...toRefs(state),
      dark,
      isTransparant,
      isWhiteLogo,
      toggleMenu,
      // onClickOutside
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  @apply fixed;
  @apply shadow-md;

  &::before {
    content: '';
    @apply absolute;
    @apply bg-black;
    top: 100%;
    right: 0;
    left: 0;
    height: 100vh;
    transition: opacity 0.2s ease-in-out;
    @apply opacity-0;
    @apply pointer-events-none;
  }

  .menu {
    top: -100vh;
    transition: top 0.2s ease-in-out;
    @apply max-h-screen;
    @apply overflow-y-scroll;
    @apply flex;
    @apply absolute;
    @apply right-0;
    @apply left-0;
    @apply flex-col;
    @apply bg-nord6;
    @apply z-50;
    @apply shadow-md;
    @apply py-5;

    @screen lg {
      @apply flex;
      @apply relative;
      @apply flex-row;
      @apply items-center;
      @apply top-0;
      @apply shadow-none;
      @apply border-t-0;
      @apply py-0;
      @apply overflow-y-hidden;
    }
  }

  .links {
    .menu-item {
      a:hover {
        @apply text-nord10;
      }
    }
  }

  .socials {
    @apply pt-3;
    @apply mt-3;
    @apply border-t;
    @apply border-nord4;

    @screen lg {
      @apply pt-0;
      @apply mt-0;
      @apply pl-3;
      @apply ml-3;
      @apply border-l;
    }
  }

  .menu-item {
    @apply font-bold;
    @apply uppercase;
    @apply inline-block;
    @apply no-underline;
    @apply text-nord0;
    @apply p-2;

    .router-link-exact-active:not([href='/']) {
      @apply text-nord10;
    }
  }

  .burger {
    button {
      @apply text-nord0;
      @apply border-nord0;
    }
  }

  &.dark {
    .menu {
      @apply bg-nord1;
    }

    .menu-item {
      @apply text-nord6;
    }

    .socials {
      @apply border-nord3;
    }

    .burger {
      button {
        @apply text-nord6;
        @apply border-nord6;
      }
    }
  }

  &.active {
    .menu {
      top: 100%;

      @screen lg {
        @apply top-0;
      }
    }

    &::before {
      @apply opacity-75;
      @apply pointer-events-auto;

      @screen lg {
        @apply hidden;
      }
    }
  }

  &.transparant {
    @apply bg-transparent;
    @apply shadow-none;

    @screen lg {
      .menu {
        @apply bg-transparent;
      }

      .socials {
        @apply border-nord4;
      }

      .menu-item {
        @apply text-nord6;
      }
    }

    .burger {
      button {
        @apply text-nord6;
        @apply border-nord6;
      }
    }
  }
}
</style>
