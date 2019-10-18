<template>
  <b-navbar class="is-primary is-transparent">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="@/assets/logo-white.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item class="text" tag="router-link" :to="{ name: 'home' }"
        >Welcome</b-navbar-item
      >
      <b-navbar-item
        class="text"
        tag="router-link"
        :to="{ path: '/leaderboards' }"
        >Leaderboards</b-navbar-item
      >
      <b-navbar-item
        class="text"
        tag="a"
        target="_blank"
        href="https://wiki.speedsouls.com/Main_Page"
        >Wiki</b-navbar-item
      >
      <b-navbar-item
        class="text"
        tag="a"
        target="_blank"
        href="https://forums.speedsouls.com"
        >Forums</b-navbar-item
      >
      <b-navbar-item
        tag="a"
        class="text"
        target="_blank"
        href="https://wiki.speedsouls.com/Run_submission"
        >Submit a run</b-navbar-item
      >
      <span class="separator"></span>
      <b-navbar-item
        tag="a"
        target="_blank"
        href="https://discord.speedsouls.com"
      >
        <b-icon pack="fab" icon="fa-discord"></b-icon>
      </b-navbar-item>
      <b-navbar-item
        tag="a"
        target="_blank"
        href="https://discord.speedsouls.com"
      >
        <b-icon pack="fab" icon="fa-patreon"></b-icon>
      </b-navbar-item>
      <b-navbar-item
        tag="a"
        target="_blank"
        href="https://discord.speedsouls.com"
      >
        <b-icon pack="fab" icon="fa-twitter"></b-icon>
      </b-navbar-item>
      <b-navbar-item
        tag="a"
        target="_blank"
        href="https://discord.speedsouls.com"
      >
        <b-icon pack="fab" icon="fa-github"></b-icon>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

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
