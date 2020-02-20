<template>
  <footer class="footer is-black">
    <div class="content container has-text-centered">
      <div class="columns is-multiline is-mobile is-8">
        <div
          v-for="(s, key) in socials"
          :key="key"
          class="social column is-full-mobile is-half-tablet is-one-third-desktop"
        >
          <a target="_blank" :href="s.url">
            <b-icon pack="fab" class="social_icon" :icon="s.icon"></b-icon>
            <span
              class="social_text is-size-4 has-text-weight-bold has-text-light"
              >{{ s.title }}</span
            >
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
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
        title: "Twitch",
        icon: "twitch",
        url: "https://www.twitch.tv/speedsouls"
      },
      {
        title: "Team",
        icon: "twitch",
        url: "https://www.twitch.tv/team/speedsouls"
      },
      {
        title: "Github",
        icon: "github",
        url: "https://github.com/CapitaineToinon/buefy-souls"
      }
    ]
  })
};
</script>

<style scoped lang="scss">
.footer {
  .social {
    &_icon {
      color: $light;
      margin-right: 1rem;
    }
  }
}
</style>
