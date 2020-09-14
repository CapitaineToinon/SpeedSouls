<template>
  <error v-if="error" :error="error" />
  <div v-else-if="!games" class="progress h-2 flex flex-row" />
  <div v-else class="flex flex-col justify-center w-full">
    <div
      class="games grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <router-link
        :to="{
          name: 'Game',
          params: {
            game: game.abbreviation
          }
        }"
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
import { reactive, toRefs, onMounted } from '@vue/composition-api';
import { useSoulsGames } from '@/api/rx-souls';
import Error from '@/components/Error';
import GameCard from '@/components/GameCard';
import BySpeedrunCom from '@/components/BySpeedrunCom';

export default {
  components: { Error, GameCard, BySpeedrunCom },
  setup() {
    const state = reactive({
      games: undefined,
      error: null
    });

    async function fetchGames() {
      state.games = undefined;
      state.error = null;

      try {
        state.games = await useSoulsGames().toPromise();
      } catch (e) {
        state.error = e;
      }
    }

    onMounted(fetchGames);

    return toRefs(state);
  }
};
</script>

<style lang="scss" scoped>
.games a:hover {
  transition: all 0.1s ease-in-out;
  transform: scale(1.02);
}
</style>
