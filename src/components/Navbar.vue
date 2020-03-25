<template>
  <nav
    class="navbar is-dark"
    :class="{ '-transparant': isTransparant }"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'home' }">
        <img src="@/assets/logo-white.png" alt="SpeedSouls White Logo" />
      </router-link>

      <a
        @click="toggle"
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': active }"
        aria-label="menu"
        aria-expanded="false"
        data-target="speedsoulsNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="speedsoulsNavbar"
      class="navbar-menu has-text-centered"
      :class="{ 'is-active': active }"
    >
      <div class="navbar-end">
        <router-link
          @click.native="close"
          class="text navbar-item"
          :to="{ name: 'home' }"
          >Welcome</router-link
        >
        <router-link
          @click.native="close"
          class="text navbar-item"
          :to="{ name: 'games' }"
          >Leaderboards</router-link
        >
        <a class="text navbar-item" target="_blank" :href="links.wiki">Wiki</a>
        <a class="text navbar-item" target="_blank" :href="links.forums"
          >Forums</a
        >
        <router-link
          @click.native="close"
          class="text navbar-item"
          :to="{ name: 'submit' }"
          >Submit a run</router-link
        >
        <span class="separator"></span>
        <a
          v-for="(s, key) in socials"
          :key="key"
          class="navbar-item"
          target="_blank"
          :href="s.url"
        >
          <b-icon pack="fab" :icon="s.icon"></b-icon>
          <span class="is-hidden-desktop">{{ s.title }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import withScroll from "../mixins/withScroll";

export default {
  mixins: [withScroll],
  data: () => ({
    active: false,
    links: {
      wiki: "https://wiki.speedsouls.com/Main_Page",
      forums: "https://forums.speedsouls.com",
      submit: "https://wiki.speedsouls.com/Run_submission"
    },
    socials: [
      {
        title: "Discord",
        icon: "discord",
        url: "http://discord.speedsouls.com"
      },
      {
        title: "Patreon",
        icon: "patreon",
        url: "https://www.patreon.com/speedsouls"
      },
      {
        title: "Twitter",
        icon: "twitter",
        url: "https://twitter.com/soulsruns"
      },
      {
        title: "Github",
        icon: "github",
        url: "https://github.com/CapitaineToinon/buefy-souls"
      }
    ]
  }),
  computed: {
    isTransparant() {
      return this.$route.name === "home" && this.off.y < 100;
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    close() {
      this.active = false;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  transition: all $speed-slower;

  --opacity: 1;
  background-color: rgba($color: $primary, $alpha: var(--opacity)) !important;

  &.-transparant {
    --opacity: 0;
  }

  .navbar-brand {
    .router-link-active:hover {
      background-color: inherit !important;
    }
  }

  .navbar-menu {
    @include touch {
      display: inherit;
      position: absolute;
      width: 100%;
      top: 0;
      transform: translateY(-100%);
      transition: all $speed-slow;

      &.is-active {
        transform: translateY($navbar-height);
      }
    }

    .router-link-exact-active {
      // background-color: $navbar-item-active-background-color;
    }

    .navbar-end {
      letter-spacing: 1px;

      .text {
        text-transform: uppercase;
        font-weight: $weight-bold;
        font-size: $small-font-size;

        &::after {
          content: ".";
        }
      }

      .separator {
        @include desktop {
          border-right: 1px $grey-light solid;
          margin: 5px 14px;
        }

        @include touch {
          display: block;
          padding-top: 1rem;
          margin: 0 1rem 1rem;
          border-bottom: 1px $grey-light solid;
        }
      }
    }
  }
}
</style>
