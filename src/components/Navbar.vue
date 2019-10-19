<template>
  <nav
    class="navbar is-primary is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
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
        class="navbar-menu"
        :class="{ 'is-active': active }"
      >
        <div class="navbar-end">
          <router-link class="text navbar-item" :to="{ name: 'home' }"
            >Welcome</router-link
          >
          <router-link class="text navbar-item" :to="{ name: 'games' }"
            >Leaderboards</router-link
          >
          <a
            class="text navbar-item"
            target="_blank"
            href="https://wiki.speedsouls.com/Main_Page"
            >Wiki</a
          >
          <a
            class="text navbar-item"
            target="_blank"
            href="https://forums.speedsouls.com"
            >Forums</a
          >
          <a
            tag="a"
            class="text navbar-item"
            target="_blank"
            href="https://wiki.speedsouls.com/Run_submission"
            >Submit a run</a
          >
          <span class="separator"></span>
          <a
            class="navbar-item"
            target="_blank"
            href="https://discord.speedsouls.com"
          >
            <b-icon pack="fab" icon="fa-discord"></b-icon>
          </a>
          <a
            class="navbar-item"
            target="_blank"
            href="https://discord.speedsouls.com"
          >
            <b-icon pack="fab" icon="fa-patreon"></b-icon>
          </a>
          <a
            class="navbar-item"
            target="_blank"
            href="https://discord.speedsouls.com"
          >
            <b-icon pack="fab" icon="fa-twitter"></b-icon>
          </a>
          <a
            class="navbar-item"
            target="_blank"
            href="https://discord.speedsouls.com"
          >
            <b-icon pack="fab" icon="fa-github"></b-icon>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    active: false
  }),
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  .navbar-menu {
    .navbar-end {
      a.text {
        text-transform: uppercase;
        font-weight: $weight-bold;
        font-size: $small-font-size;

        &::after {
          content: ".";
        }
      }

      .separator {
        border-right: 1px $grey-light solid;
        margin: 5px 14px;
      }
    }
  }
}
</style>
