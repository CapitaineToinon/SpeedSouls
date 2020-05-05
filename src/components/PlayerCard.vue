<template>
  <div
    class="bg-nord6 dark:bg-nord1 rounded overflow-hidden shadow-lg py-5 flex flex-col justify-evenly"
  >
    <div class="flex-1 flex flex-col justify-center mx-2">
      <img
        class="pp w-auto object-fit mx-auto mb-4"
        :class="{ invisible: !playerImage }"
        :src="`https://www.speedrun.com/themes/user/${player.name}/image.png`"
        @error="onImageError"
        :alt="`${player.name}'s profile picture`"
      />
      <div class="px-6">
        <div class="font-bold text-xl text-center text-nord0 dark:text-nord6">
          <player-name :player="player" />
        </div>
        <p
          v-if="player.signup"
          class="text-nord3 dark:text-nord4 text-center text-base"
        >
          {{ joinedDate }}
        </p>
      </div>
      <div
        v-if="playerLinks.length"
        class="links flex flex-row justify-center px-6"
      >
        <a
          v-for="(link, i) in playerLinks"
          :key="i"
          :href="player[link].uri"
          target="_blank"
          v-tooltip.top-center="capitalize(link)"
          class="mx-1"
        >
          <font-awesome-icon
            :class="`text-${link}`"
            :icon="['fab', link]"
            size="1x"
          />
        </a>
        <a
          v-if="player.weblink"
          :href="player.weblink"
          v-tooltip.top-center="`speedrun.com`"
          class="mx-1"
          target="_blank"
        >
          <font-awesome-icon
            class="text-nord3 dark:text-nord4"
            :icon="['fas', 'link']"
            size="1x"
          />
        </a>
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
import PlayerName from "@/components/PlayerName";
import formatDate from "date-fns/format";

export default {
  components: { PlayerName },
  data: () => ({
    links: ["twitch", "youtube", "twitter"],
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
  methods: {
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    onImageError() {
      this.playerImage = false;
    }
  },
  computed: {
    joinedDate() {
      if (!this.player.signup) return;
      return formatDate(new Date(this.player.signup), "do MMM yyyy");
    },
    playerLinks() {
      return this.links.filter(link => this.player[link]);
    },
    profile() {
      return {
        name: "Player",
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
</style>
