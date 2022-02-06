<template>
  <error v-if="error" :error="error" />
  <div v-else-if="!games" class="progress flex h-2 flex-row" />
  <div v-else class="flex w-full flex-col justify-center">
    <div
      class="games mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <router-link
        v-for="(game, i) in games"
        :key="i"
        :to="{
          name: 'Game',
          params: {
            game: game.abbreviation,
          },
        }"
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
import Error from '@/components/Error.vue';
import GameCard from '@/components/GameCard.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';

export default {
  components: { Error, GameCard, BySpeedrunCom },
  setup() {
    const state = reactive({
      games: undefined,
      error: null,
    });

    async function fetchGames() {
      state.games = undefined;
      state.error = null;

      try {
        const games = await useSoulsGames().toPromise();
        Object.freeze(games);

        state.games = games;
      } catch (e) {
        state.error = e;
      }
    }

    onMounted(fetchGames);

    return toRefs(state);
  },
};
</script>

<style lang="scss" scoped>
.games a:hover {
  transition: all 0.1s ease-in-out;
  transform: scale(1.02);
}
</style>
