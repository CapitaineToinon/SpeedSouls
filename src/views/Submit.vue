<template>
  <div class="container max-w-screen-md py-6 px-3">
    <site-notice />
    <h1 class="mb-4 text-4xl font-bold leading-none text-nord0 dark:text-nord6">
      Submit a Run.
    </h1>
    <alert type="info" class="mb-6">
      You will need a
      <a :href="VITE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      account to be able to submit a run. Runs submitted on
      <a :href="VITE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      will appear both on
      <a :href="VITE_APP_SPEEDRUNCOM" target="_blank" rel="noopener"
        >speedrun.com</a
      >
      and here on SpeedSouls.
    </alert>
    <error v-if="error" :error="error" />
    <div v-else-if="!games" class="progress flex h-2 flex-row" />
    <div
      v-else
      class="my-3 mb-4 rounded bg-nord5 text-nord0 shadow-md dark:bg-nord1 dark:text-nord6"
    >
      <div
        v-for="(game, i) in games"
        :key="game.id"
        class="tab w-full overflow-hidden"
        :class="{ 'border-t border-nord4 dark:border-nord3': i !== 0 }"
      >
        <input
          :id="`tab-${game.id}`"
          class="absolute opacity-0"
          type="checkbox"
          name="tabs2"
        />
        <label
          class="block cursor-pointer p-5 leading-normal"
          :for="`tab-${game.id}`"
          >{{ game.name }}</label
        >
        <div
          :ref="`section-${game.id}`"
          class="tab-content overflow-hidden border-l-2 border-nord10 bg-nord6 leading-normal dark:bg-nord2"
        >
          <div class="flex flex-row flex-wrap justify-start p-5 shadow-inner">
            <a
              v-for="(category, i) in game.categories"
              :key="i"
              class="btn m-px rounded border border-nord10 py-2 px-4 text-left text-nord0 dark:text-nord6"
              :href="`${game.weblink}/editrun#${category.uglyHash}`"
              target="_blank"
              rel="noopener"
              >{{ category.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col">
      <by-speedrun-com class="text-center" />
    </div>
  </div>
</template>

<script>
const { VITE_APP_SPEEDRUNCOM } = import.meta.env;
import { reactive, onMounted, toRefs } from '@vue/composition-api';
import { useSoulsGames } from '@/api/rx-souls';
import Alert from '@/components/Alert.vue';
import Error from '@/components/Error.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';

export default {
  metaInfo: {
    title: 'Submit a run',
  },
  components: { Alert, BySpeedrunCom, Error },
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

    return {
      VITE_APP_SPEEDRUNCOM,
      ...toRefs(state),
    };
  },
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
