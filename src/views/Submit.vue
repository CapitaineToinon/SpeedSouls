<template>
  <div v-if="games" class="container max-w-screen-md">
    <alert type="warning" class="mb-3">
      You will need a
      <a href="#" target="_blank">speedrun.com</a> account to submit a run. Runs
      submitted on speedrun.com will both apear on
      <a href="#" target="_blank">speedrun.com</a> and
      <router-link to="/">speedsouls.com</router-link>
    </alert>
    <div
      class="my-3 shadow-md text-nord0 dark:text-nord6 bg-nord5 dark:bg-nord1 rounded"
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
          class="tab-content overflow-hidden border-l-2 border-nord10 bg-nord6 dark:bg-nord2 leading-normal"
        >
          <div class="p-5 flex flex-row flex-wrap justify-start shadow-inner">
            <a
              class="btn border border-nord10 text-nord0 dark:text-nord6 text-left py-2 px-4 m-px rounded"
              v-for="(category, i) in game.categories"
              :key="i"
              :href="`${game.weblink}/editrun#${category.uglyHash}`"
              target="_blank"
            >
              {{ category.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { useSoulsGames } from '@/api/rx-souls';
import Alert from '@/components/Alert';

export default {
  components: { Alert },
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
.tab {
  /* Tab content - closed */
  .tab-content {
    max-height: 0;
    transition: max-height 0.1s;
  }
  /* :checked - resize to full height */
  input:checked ~ .tab-content {
    max-height: 100vh;
  }
}
</style>
