<template>
  <footer class="bg-nord6 py-5 px-6 font-sans shadow-md dark:bg-nord1">
    <div class="container">
      <div
        class="socials grid grid-cols-4 gap-4 py-12 text-center text-nord0 dark:text-nord6"
      >
        <div class="discord">
          <a
            :href="VITE_APP_DISCORD"
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
            :href="VITE_APP_TWITTER"
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
            :href="VITE_APP_PATREON"
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
            :href="VITE_APP_GITHUB"
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
        class="mt-4 border-t border-nord5 pt-4 text-center text-xs text-nord0 dark:border-nord3 dark:text-nord6"
      >
        Site created by the SpeedSouls team. Please visit our
        <a :href="VITE_APP_GITHUB">Github</a> to report any issues. This work is
        licensed under a
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          >CC BY-NC-ND 4.0 Int'l License</a
        >.
      </div>
      <div
        v-if="VITE_APP_GITHUB_SHA"
        class="mt-4 pt-4 text-center text-xs text-nord0 dark:border-nord3 dark:text-nord6"
      >
        Site deployed by commit
        <a
          :href="`${VITE_APP_GITHUB_SERVER_URL}/${VITE_APP_GITHUB_REPOSITORY}/commit/${VITE_APP_GITHUB_SHA}`"
          >{{ VITE_APP_GITHUB_SHA }}</a
        >.
      </div>
    </div>
  </footer>
</template>

<script>
const {
  VITE_APP_DISCORD,
  VITE_APP_PATREON,
  VITE_APP_TWITTER,
  VITE_APP_GITHUB,
  VITE_APP_GITHUB_SHA,
  VITE_APP_GITHUB_REPOSITORY,
  VITE_APP_GITHUB_SERVER_URL,
} = import.meta.env;

export default {
  data: () => ({
    VITE_APP_DISCORD,
    VITE_APP_PATREON,
    VITE_APP_TWITTER,
    VITE_APP_GITHUB,
    VITE_APP_GITHUB_SHA,
    VITE_APP_GITHUB_REPOSITORY,
    VITE_APP_GITHUB_SERVER_URL,
  }),
};
</script>
