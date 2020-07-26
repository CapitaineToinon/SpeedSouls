<template>
  <div class="container max-w-screen-md">
    <h1 class="text-4xl font-bold leading-none mb-4 text-nord0 dark:text-nord6">
      Submit a Run.
    </h1>
    <alert type="info" class="mb-3">
      You will need a
      <a :href="VUE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      account to be able to submit a run. Runs submitted on
      <a :href="VUE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      will appear both on
      <a :href="VUE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      and here on SpeedSouls.
    </alert>
    <div v-if="error">
      <error :error="error" />
    </div>
    <div v-else-if="!games">
      <div class="progress h-2 flex flex-row"></div>
    </div>
    <div v-else>
      <div
        class="my-3 shadow-md text-nord0 dark:text-nord6 bg-nord5 dark:bg-nord1 rounded mb-4"
      >
        <div
          class="tab w-full overflow-hidden"
          :class="{ 'border-t border-nord4 dark:border-nord3': i !== 0 }"
          v-for="(game, i) in games"
          :key="game.id"
        >
          <input
            class="absolute opacity-0"
            :id="`tab-${game.id}`"
            type="checkbox"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            :for="`tab-${game.id}`"
            >{{ game.name }}</label
          >
          <div
            :ref="`section-${game.id}`"
            class="tab-content overflow-hidden border-l-2 border-nord10 bg-nord6 dark:bg-nord2 leading-normal"
          >
            <div class="p-5 flex flex-row flex-wrap justify-start shadow-inner">
              <a
                class="btn border border-nord10 text-nord0 dark:text-nord6 text-left py-2 px-4 m-px rounded"
                v-for="(category, i) in game.categories"
                :key="i"
                :href="`${game.weblink}/editrun#${category.uglyHash}`"
                target="_blank"
                rel="noopener"
                >{{ category.name }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <by-speedrun-com class="text-center" />
      </div>
    </div>
  </div>
</template>

<script>
const { VUE_APP_SPEEDRUNCOM } = process.env;
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { useSoulsGames } from '@/api/rx-souls';
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import BySpeedrunCom from '@/components/BySpeedrunCom';

export default {
  metaInfo: {
    title: 'Submit a run'
  },
  components: { Alert, BySpeedrunCom, Error },
  data: () => ({
    VUE_APP_SPEEDRUNCOM,
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
    }
  },
  mounted() {
    this.$subscribeTo(
      useSoulsGames().pipe(
        tap(() => (this.error = null)),
        catchError(this.onError)
      ),
      this.onSuccess
    );
  }
};
</script>

<style lang="scss" scoped>
.tab {
  /* Tab content - closed */
  .tab-content {
    height: 0;
    transition: all 0.6s;
  }
  /* :checked - resize to full height */
  input:checked ~ .tab-content {
    height: auto;
  }
}
</style>
