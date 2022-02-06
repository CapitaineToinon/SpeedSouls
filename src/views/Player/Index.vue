<template>
  <div class="container flex flex-col flex-wrap py-6 px-3 lg:flex-row">
    <site-notice />
    <aside
      v-if="!error"
      class="mb-0 w-full gap-4 lg:w-64"
      :class="{
        'order-2 lg:order-1 ': isRunPage,
      }"
    >
      <div v-if="players.length">
        <player-card
          v-for="(p, i) in players"
          :key="i"
          class="mb-4"
          :class="{ sticky: $route.name === 'Player' }"
          :player="p"
          :showbutton="isRunPage"
        />
      </div>
      <div
        v-else
        class="flex flex-col justify-evenly overflow-hidden rounded bg-nord6 py-5 text-center shadow-lg dark:bg-nord1"
      >
        <div class="mx-2 flex flex-1 flex-col items-center justify-center">
          <div class="is-skeleton mb-5 w-1/2 rounded pb-4"></div>
          <div class="is-skeleton mb-5 w-1/3 rounded pb-1/3"></div>
          <div class="is-skeleton w-2/3 rounded pb-3"></div>
          <div
            v-if="isRunPage"
            class="mx-2 mt-4 flex flex-1 flex-row items-center justify-center"
          >
            <button
              disabled
              class="w-auto cursor-not-allowed rounded border-b-4 border-nord9 bg-nord10 py-2 px-4 font-bold text-white opacity-50"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
      <div v-if="isRunPage" class="mt-5 flex w-full flex-col lg:hidden">
        <by-speedrun-com class="text-center" />
      </div>
    </aside>

    <div
      class="ml-0 w-full md:flex-1 lg:ml-5"
      :class="{ 'order-1 mb-4 lg:order-2 lg:mb-0': isRunPage }"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * This template is used both by the /user/<user> and the /run/<run>
 * routes so we need some logic to be able to tell which one we're
 * on and change the source in which we get the players from.
 * We don't need to worry about duplicated api calls because it's
 * cached on the frontend. We also don't do loaders or error
 * display because the child routes already do. We do hide everything
 * on error though.
 *
 * Players is always an array, even on profiles, to simplify the logic.
 */
import PlayerCard from '@/components/PlayerCard.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';
import { useUser, useRuns } from '@/api/rx-souls';
import { ref, computed, watch } from '@vue/composition-api';
import { map } from 'rxjs/operators';
import { iif } from 'rxjs';

export default {
  components: { BySpeedrunCom, PlayerCard },
  setup(props, { root }) {
    const isRunPage = computed(() => root.$route.name === 'Run');
    const isPlayerPage = computed(() => !isRunPage.value);
    const players = ref([]);
    const error = ref(null);

    /**
     * Get the player from the run api
     */
    const getFromRun = computed(() =>
      useRuns(root.$route.params.id).pipe(map(({ players }) => players))
    );

    /**
     * Get the player from the user api
     */
    const getFromUser = computed(() =>
      useUser(root.$route.params.id).pipe(map((player) => [player]))
    );

    /**
     * Find a player by name
     * @param {any} player
     * @param {array} source
     * @return {any} player
     */
    function find(player, source) {
      return source.find((p) => p.name === player.name);
    }

    // we do not expose the promise here and don't do
    // any loader or error displaying in this route
    // because child routes already do it. Just hide
    // the template if error
    const playersPromise = computed(() =>
      iif(
        () => isRunPage.value,
        getFromRun.value,
        getFromUser.value
      ).toPromise()
    );

    // watchEffect updating the players array
    // only remove or add players accordingly
    // to prevent the template to refresh
    // needlessly
    async function effect(id, old) {
      if (id === old) return;
      error.value = null;

      try {
        const newPlayers = await Promise.resolve(playersPromise.value);
        Object.freeze(newPlayers);

        let length = players.value.length;

        // remove the curre t players that aren't in the
        // new players
        while (length--) {
          const p = players.value[length];
          if (!find(p, newPlayers)) players.value.pop();
        }

        // add the new players that aren't already
        // in the list of current players
        newPlayers.forEach((p) => {
          if (!find(p, players.value)) players.value.push(p);
        });
      } catch (e) {
        // save the error to hide the template
        error.value = e;
      }
    }

    // the id can either be a username or a run id
    watch(() => root.$route.params.id, effect, {
      immediate: true,
    });

    return {
      isRunPage,
      isPlayerPage,
      players,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
aside {
  .sticky {
    top: calc(var(--navbar-height) + 1.5rem);
  }
}
</style>
