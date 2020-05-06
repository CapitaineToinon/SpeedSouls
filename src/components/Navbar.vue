<template>
  <nav
    class="font-sans text-center flex h-12 justify-between px-3 bg-nord6 dark:bg-nord1"
    :class="{ transparant: isTransparant, active: !hidden, dark: dark }"
  >
    <router-link to="/" class="h-full flex flex-col justify-center">
      <img
        class="h-10 sm:h-10 py-2"
        v-show="isWhiteLogo"
        :src="require('@/assets/logo-white.png')"
        alt="speedsouls logo"
      />
      <img
        v-show="!isWhiteLogo"
        class="h-10 sm:h-10 py-2"
        :src="require('@/assets/logo-black.png')"
        alt="speedsouls logo"
      />
    </router-link>
    <div class="burger flex flex-col justify-center lg:hidden">
      <button
        ref="burger"
        @click="toggleMenu"
        class="flex items-center px-3 py-2 border rounded"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="menu" v-click-outside="onClickOutside">
      <ul class="links flex flex-col lg:flex-row list-none">
        <li class="menu-item">
          <router-link to="/">Home.</router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{ name: 'Games' }">Leaderboards.</router-link>
        </li>
        <li class="menu-item">
          <a href="#">Wiki.</a>
        </li>
        <li class="menu-item">
          <a href="#">Forums.</a>
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
            'dark:border-nord6': transparant
          }"
        >
          <a href="#" class="hover:text-discord">
            <font-awesome-icon :icon="['fab', 'discord']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a href="#" class="hover:text-patreon">
            <font-awesome-icon :icon="['fab', 'patreon']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a href="#" class="hover:text-twitter">
            <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
          </a>
        </li>
        <li class="menu-item icon">
          <a href="#" class="hover:text-nord10">
            <font-awesome-icon :icon="['fab', 'github']" size="2x" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import withScroll from "@/mixins/withScroll.js";
import { mapState } from "vuex";

export default {
  mixins: [withScroll],
  data: () => ({
    hidden: true
  }),
  props: {
    transparant: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleMenu() {
      this.hidden = !this.hidden;
    },
    onClickOutside({ target }) {
      // close the menu if clicked outside of it or the burger
      if (target === this.$refs.burger || this.$refs.burger.contains(target))
        return;
      this.hidden = true;
    }
  },
  computed: {
    ...mapState(["dark"]),
    isWhiteLogo() {
      return this.dark || this.isTransparant;
    },
    isTransparant() {
      return this.transparant && this.off.y < 100;
    }
  },
  watch: {
    "$route.name": {
      deep: true,
      immediate: true,
      handler() {
        this.hidden = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  @apply fixed;
  @apply shadow-md;

  &::before {
    content: "";
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
    @apply overflow-scroll;
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

    &.icon {
      @apply mt-1;
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
    }

    .menu-item {
      @apply text-nord6;
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
