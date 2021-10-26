<template>
  <div
    class="bg-nord6 text-center dark:bg-nord1 rounded overflow-hidden shadow-lg py-5 flex flex-col justify-evenly"
  >
    <div class="flex-1 flex flex-col justify-center mx-2">
      <p
        class="player-name max-w-full overflow-hidden text-base text-nord0 dark:text-nord4 mb-4"
      >
        {{ player.name }}
      </p>
      <img
        class="pp w-auto object-fit mx-auto mb-4"
        :class="{ hidden: !playerImage }"
        :src="`https://www.speedrun.com/themes/user/${player.name}/image.png`"
        @error="onImageError"
        :alt="`${player.name}'s profile picture`"
      />
      <p class="text-base text-nord3 dark:text-nord6" v-if="player.country">
        <span
          class="whitespace-no-wrap"
          :class="`flag-icon flag-icon-${player.country.code} mr-1`"
        />
        {{ player.country.name }}
      </p>
      <p class="text-nord3 dark:text-nord4 text-base" v-if="player.signup">
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
      class="flex-1 flex flex-row items-center mx-2 justify-center mt-4"
      v-if="showbutton"
    >
      <router-link
        tag="button"
        :to="profile"
        :disabled="!player.id"
        :class="{ 'cursor-not-allowed opacity-50': !player.id }"
        class="w-auto bg-nord10 text-white font-bold py-2 px-4 border-b-4 border-nord9 rounded"
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
  data: () => ({
    playerImage: true
  }),
  props: {
    player: {
      type: Object,
      required: true
    },
    showbutton: {
      type: Boolean,
      default: () => true
    }
  },
  filters: {
    date
  },
  methods: {
    onImageError() {
      this.playerImage = false;
    }
  },
  computed: {
    profile() {
      return {
        name: 'Player',
        params: {
          id: this.player.name
        }
      };
    }
  }
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
