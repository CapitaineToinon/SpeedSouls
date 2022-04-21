<template>
  <div
    class="flex flex-col justify-evenly overflow-hidden rounded bg-nord6 py-5 text-center shadow-lg dark:bg-nord1"
  >
    <div class="mx-2 flex flex-1 flex-col justify-center">
      <p
        class="player-name mb-4 max-w-full overflow-hidden text-base text-nord0 dark:text-nord4"
      >
        {{ player.name }}
        <span v-if="player.pronouns">({{ player.pronouns }})</span>
      </p>
      <img
        class="pp object-fit mx-auto mb-4 w-auto"
        :class="{ hidden: !playerImage }"
        :src="`https://www.speedrun.com/themes/user/${player.name}/image.png`"
        :alt="`${player.name}'s profile picture`"
        @error="onImageError"
      />
      <p v-if="player.country" class="text-base text-nord3 dark:text-nord6">
        <span
          class="whitespace-nowrap"
          :class="`flag-icon flag-icon-${player.country.code} mr-1`"
        />
        {{ player.country.name }}
      </p>
      <p v-if="player.signup" class="text-base text-nord3 dark:text-nord4">
        {{ player.signup | date }}
      </p>
      <div class="links flex flex-row justify-center px-6">
        <tooltip v-if="player['twitch']" text="Twitch">
          <a
            :href="player['twitch'].uri"
            target="_blank"
            rel="noopener"
            class="mx-1"
          >
            <font-awesome-icon
              class="text-twitch"
              :icon="['fab', 'twitch']"
              size="1x"
            />
          </a>
        </tooltip>
        <tooltip v-if="player['twitter']" text="Twitter">
          <a
            :href="player['twitter'].uri"
            target="_blank"
            rel="noopener"
            class="mx-1"
          >
            <font-awesome-icon
              class="text-twitter"
              :icon="['fab', 'twitter']"
              size="1x"
            />
          </a>
        </tooltip>
        <tooltip v-if="player['youtube']" text="Youtube">
          <a
            :href="player['youtube'].uri"
            target="_blank"
            rel="noopener"
            class="mx-1"
          >
            <font-awesome-icon
              class="text-youtube"
              :icon="['fab', 'youtube']"
              size="1x"
            />
          </a>
        </tooltip>
        <tooltip v-if="player.weblink" text="speedrun.com">
          <a :href="player.weblink" class="mx-1" target="_blank" rel="noopener">
            <font-awesome-icon
              class="text-nord0 dark:text-nord4"
              :icon="['fas', 'link']"
              size="1x"
            />
          </a>
        </tooltip>
      </div>
    </div>
    <div
      v-if="showbutton"
      class="mx-2 mt-4 flex flex-1 flex-row items-center justify-center"
    >
      <router-link
        tag="button"
        :to="profile"
        :disabled="!player.id"
        :class="{ 'cursor-not-allowed opacity-50': !player.id }"
        class="w-auto rounded border-b-4 border-nord9 bg-nord10 py-2 px-4 font-bold text-white"
        >View Profile</router-link
      >
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip.vue';
import date from '@/filters/date';

export default {
  components: { Tooltip },
  filters: {
    date,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
    showbutton: {
      type: Boolean,
      default: () => true,
    },
  },
  data: () => ({
    playerImage: true,
  }),
  computed: {
    profile() {
      return {
        name: 'Player',
        params: {
          id: this.player.namelink,
        },
      };
    },
  },
  methods: {
    onImageError() {
      this.playerImage = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pp {
  width: auto;
  max-width: 80%;
  height: 5rem;
  max-height: 5rem;
}

.player-name {
  text-overflow: ellipsis;
}
</style>
