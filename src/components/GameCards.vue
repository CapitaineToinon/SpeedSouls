<template>
  <div
    class="games grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <router-link
      :to="to(game.abbreviation)"
      v-for="(game, i) in games"
      :key="i"
    >
      <game-card :game="game" />
    </router-link>
  </div>
</template>

<script>
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { useSoulsGames } from "@/api/rx-souls";
import GameCard from "@/components/GameCard";

export default {
  components: { GameCard },
  data: () => ({
    games: undefined,
    error: null
  }),
  methods: {
    onSuccess(games) {
      if (!games) return;

      this.error = null;
      this.games = games;
    },
    onError(error) {
      this.error = error;
      return of(undefined);
    },
    to(game) {
      return {
        name: "Game",
        params: {
          game
        }
      };
    }
  },
  mounted() {
    this.$subscribeTo(
      useSoulsGames().pipe(catchError(this.onError)),
      this.onSuccess
    );
  }
};
</script>

<style lang="scss" scoped>
.games a:hover {
  transition: all 0.1s ease-in-out;
  transform: scale(1.02);
}
</style>
