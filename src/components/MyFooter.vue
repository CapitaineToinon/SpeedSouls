<template>
  <footer class="font-sans shadow-md bg-nord6 dark:bg-nord1 py-5 px-6">
    <div class="container">
      <div
        class="socials text-nord0 dark:text-nord6 py-12 grid grid-cols-4 gap-4 text-center"
      >
        <div class="discord">
          <a
            :href="VUE_APP_DISCORD"
            class="hover:text-discord"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon
              class="mb-2"
              :icon="['fab', 'discord']"
              size="3x"
            />
            <p>Discord</p>
          </a>
        </div>
        <div class="twitter">
          <a
            :href="VUE_APP_TWITTER"
            class="hover:text-twitter"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon
              class="mb-2"
              :icon="['fab', 'twitter']"
              size="3x"
            />
            <p>Twitter</p>
          </a>
        </div>
        <div class="patreon">
          <a
            :href="VUE_APP_PATREON"
            class="hover:text-patreon"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon
              class="mb-2"
              :icon="['fab', 'patreon']"
              size="3x"
            />
            <p>Patreon</p>
          </a>
        </div>
        <div class="github">
          <a
            :href="VUE_APP_GITHUB"
            class="hover:text-nord10"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon
              class="mb-2"
              :icon="['fab', 'github']"
              size="3x"
            />
            <p>Github</p>
          </a>
        </div>
      </div>
      <div
        class="pt-4 mt-4 text-nord0 dark:text-nord6 text-xs border-t border-nord5 dark:border-nord3 text-center"
      >
        Site created by the SpeedSouls team. Please visit our
        <a :href="VUE_APP_GITHUB">Github</a> to report any issues. This work is
        licensed under a
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          >CC BY-NC-ND 4.0 Int'l License</a
        >.
      </div>
      <div
        v-if="VUE_APP_GITHUB_SHA"
        class="pt-4 mt-4 text-nord0 dark:text-nord6 text-xs dark:border-nord3 text-center"
      >
        Site deployed by commit
        <a
          :href="
            `${VUE_APP_GITHUB_SERVER_URL}/${VUE_APP_GITHUB_REPOSITORY}/commit/${VUE_APP_GITHUB_SHA}`
          "
          >{{ VUE_APP_GITHUB_SHA }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
const {
  VUE_APP_DISCORD,
  VUE_APP_PATREON,
  VUE_APP_TWITTER,
  VUE_APP_GITHUB,
  VUE_APP_GITHUB_SHA,
  VUE_APP_GITHUB_REPOSITORY,
  VUE_APP_GITHUB_SERVER_URL
} = process.env;

export default {
  data: () => ({
    VUE_APP_DISCORD,
    VUE_APP_PATREON,
    VUE_APP_TWITTER,
    VUE_APP_GITHUB,
    VUE_APP_GITHUB_SHA,
    VUE_APP_GITHUB_REPOSITORY,
    VUE_APP_GITHUB_SERVER_URL
  })
};
</script>
