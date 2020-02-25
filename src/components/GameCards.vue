<template>
  <div v-if="status.pending" class="pending container">
    <ss-loading />
  </div>
  <div v-else-if="status.rejected" class="rejected">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >Something broke</b-message
    >
  </div>
  <div v-else-if="status.fulfilled" class="fulfilled-pending is-relative">
    <div class="columns is-mobile is-multiline">
      <div
        v-for="game in games"
        :key="game.id"
        class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
      >
        <game-card
          :game="game"
          :to="{
            name: 'game',
            params: { game: game.abbreviation }
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import status from "@/mixins/status";
import { prepareGetGames } from "@/api/speedsouls";

const [getGames, cancel] = prepareGetGames();

export default {
  name: "games",
  mixins: [status],
  components: { GameCard },
  data: () => ({
    games: []
  }),
  methods: {
    async fetchData() {
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        this.games = await getGames();
        this.status.fulfilled = true;
      } catch (e) {
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    }
  },
  mounted() {
    this.fetchData();
  },
  unmounted: cancel,
  destroyed: cancel
};
</script>

<style lang="scss" scoped>
// .pending {
//   min-height: $loading-icon-size;
// }
</style>
