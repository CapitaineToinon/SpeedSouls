<template>
  <div class="container flex flex-row flex-wrap">
    <div class="title p-2 w-full">
      <h1 class="font-black text-4xl text-bold text-nord0 dark:text-nord6">
        Leaderboards
      </h1>
    </div>
    <router-link
      :to="to(game.abbreviation)"
      class="game w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-3"
      v-for="(game, i) in games"
      :key="i"
    >
      <div
        class="cursor-pointer border-gray-100 rounded overflow-hidden shadow-lg"
      >
        <div class="bg-black pb-3/5 relative">
          <img
            class="absolute h-full w-full object-cover opacity-75"
            :src="src(game)"
            alt="Sunset in the mountains"
          />
          <div
            class="absolute h-full w-full flex items-center justify-center text-center p-2"
          >
            <div class="text-gray-100 font-bold">
              {{ game.names.international }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { useSoulsGames } from "@/api/rx-souls";

export default {
  name: "games",
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
    },
    src(game) {
      let src;

      try {
        src = require(`@/assets/backgrounds/${game.abbreviation}-240.jpg`);
      } catch {
        src = game.background;
      }

      return src;
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
.game:hover {
  transition: all 0.1s ease-in-out;
  transform: scale(1.02);
}
</style>
