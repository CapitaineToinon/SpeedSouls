<template>
  <Promised :promise="gamesPromise" :pending-delay="0">
    <template #pending>
      <div class="progress h-2 flex flex-row" />
    </template>

    <template #default="games">
      <div class="flex flex-col justify-center w-full">
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

    <template #rejected="error">
      <error :error="error" />
    </template>
  </Promised>
</template>

<script>
import { ref } from '@vue/composition-api';
import { useSoulsGames } from '@/api/rx-souls';
import Error from '@/components/Error';
import GameCard from '@/components/GameCard';
import BySpeedrunCom from '@/components/BySpeedrunCom';

export default {
  components: { Error, GameCard, BySpeedrunCom },
  setup() {
    const gamesPromise = ref(useSoulsGames().toPromise());

    return {
      gamesPromise
    };
  }
};
</script>

<style lang="scss" scoped>
.games a:hover {
  transition: all 0.1s ease-in-out;
  transform: scale(1.02);
}
</style>
