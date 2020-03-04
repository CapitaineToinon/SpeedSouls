<template>
  <footer class="footer is-black">
    <div class="content container">
      <div
        class="footer-item socials columns is-multiline is-centered is-mobile has-text-centered"
      >
        <div
          v-for="(s, key) in socials"
          :key="key"
          class="social column is-one-third-mobile is-one-third-desktop"
        >
          <a target="_blank" :href="s.url">
            <b-icon pack="fab" class="social-icon" :icon="s.icon"></b-icon>
            <span
              class="social-text is-size-4 has-text-weight-bold is-hidden-mobile"
              >{{ s.title }}</span
            >
          </a>
        </div>
      </div>
      <div class="footer-item thanks columns has-text-white-ter">
        <div class="column is-full has-text-centered">
          Created with
          <a :href="vue.url">{{ vue.title }}</a
          >, <a :href="bulma.url">{{ bulma.title }}</a
          >, <a :href="buefy.url">{{ buefy.title }}</a
          >, and various other components. Big thanks to the SpeedSouls
          community for their endless contributions.
        </div>
      </div>
      <div
        class="footer-item infos-legals columns has-text-white-ter has-text-centered"
      >
        <div class="column is-full has-text-centered">
          Site created by the SpeedSouls team. Please visit our
          <a :href="socials.github.url">{{ socials.github.title }}</a> to report
          any issues. This work is licensed under a
          <a :href="cc.url">{{ cc.title }}</a> License.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    vue: {
      title: "Vue",
      url: "https://vuejs.org"
    },
    bulma: {
      title: "Bulma",
      url: "https://bulma.io"
    },
    buefy: {
      title: "Buefy",
      url: "https://buefy.org"
    },
    cc: {
      title: "CC BY-NC-ND 4.0 Int'l",
      url: "http://creativecommons.org/licenses/by-nc-nd/4.0/"
    },
    socials: {
      discord: {
        title: "Discord",
        icon: "discord",
        url: "http://discord.speedsouls.com"
      },
      patreon: {
        title: "Patreon",
        icon: "patreon",
        url: "https://www.patreon.com/speedsouls"
      },
      twitter: {
        title: "Twitter",
        icon: "twitter",
        url: "https://twitter.com/soulsruns"
      },
      twitch: {
        title: "Twitch",
        icon: "twitch",
        url: "https://www.twitch.tv/speedsouls"
      },
      team: {
        title: "Team",
        icon: "twitch",
        url: "https://www.twitch.tv/team/speedsouls"
      },
      github: {
        title: "Github",
        icon: "github",
        url: "https://github.com/CapitaineToinon/buefy-souls"
      }
    }
  })
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .container {
    .footer-item {
      padding: $size-4 0;

      &:not(:last-child) {
        border-bottom: 1px dotted $white-ter;
      }

      &.socials {
        .social {
          a:hover {
            .social-text,
            .social-icon {
              color: $primary;
            }
          }

          .social-text,
          .social-icon {
            transition: all $speed-slow;
            color: $light;
          }

          .social-icon {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>
