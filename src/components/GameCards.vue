<template>
  <div v-if="error" class="rejected">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >{{ error }}</b-message
    >
  </div>
  <div v-else-if="!games" class="pending container">
    <ss-loading />
  </div>
  <div v-else class="fulfilled-pending is-relative">
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
import { useSoulsGames } from "../api/rx-souls";

export default {
  name: "games",
  components: { GameCard },
  data: () => ({
    games: undefined,
    error: null
  }),
  methods: {
    onSuccess(games) {
      this.error = null;
      this.games = games;
    },
    onError(error) {
      this.error = error;
    }
  },
  mounted() {
    this.$subscribeTo(useSoulsGames(), this.onSuccess, this.onError);
  }
};
</script>
