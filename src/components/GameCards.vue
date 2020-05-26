<template>
  <div v-if="error" class="rejected">
    <error :error="error" />
  </div>
  <div v-else-if="!games" class="pending">
    <div class="progress h-2 flex flex-row"></div>
  </div>
  <div v-else class="flex flex-col justify-center w-full">
    <div
      class="games grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <router-link
        :to="to(game.abbreviation)"
        v-for="(game, i) in games"
        :key="i"
      >
        <game-card :game="game" />
      </router-link>
    </div>
    <by-speedrun-com class="text-center" />
  </div>
</template>

<script>
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { useSoulsGames } from '@/api/rx-souls';
import Error from '@/components/Error';
import GameCard from '@/components/GameCard';
import BySpeedrunCom from '@/components/BySpeedrunCom';

export default {
  components: { Error, GameCard, BySpeedrunCom },
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
        name: 'Game',
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
