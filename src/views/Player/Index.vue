<template>
  <div class="container py-6 px-3 flex flex-col lg:flex-row flex-wrap">
    <site-notice />
    <aside
      v-if="!error"
      class="w-full mb-0 gap-4 lg:w-64"
      :class="{
        'order-2 lg:order-1 ': isRunPage
      }"
    >
      <div v-if="players.length">
        <player-card
          class="mb-4"
          v-for="(p, i) in players"
          :class="{ sticky: $route.name === 'Player' }"
          :key="i"
          :player="p"
          :showbutton="isRunPage"
        />
      </div>
      <div
        v-else
        class="bg-nord6 text-center dark:bg-nord1 rounded overflow-hidden shadow-lg py-5 flex flex-col justify-evenly"
      >
        <div class="flex-1 flex flex-col justify-center items-center mx-2">
          <div class="is-skeleton rounded pb-4 w-1/2 mb-5"></div>
          <div class="is-skeleton rounded pb-1/3 w-1/3 mb-5"></div>
          <div class="is-skeleton rounded pb-3 w-2/3"></div>
          <div
            v-if="isRunPage"
            class="flex-1 flex flex-row items-center mx-2 justify-center mt-4"
          >
            <button
              disabled
              class="w-auto bg-nord10 text-white font-bold py-2 px-4 border-b-4 border-nord9 rounded cursor-not-allowed opacity-50"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
      <div v-if="isRunPage" class="flex lg:hidden flex-col w-full mt-5">
        <by-speedrun-com class="text-center" />
      </div>
    </aside>

    <div
      class="w-full md:flex-1 ml-0 lg:ml-5"
      :class="{ 'order-1 lg:order-2 mb-4 lg:mb-0': isRunPage }"
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
import PlayerCard from '@/components/PlayerCard';
import BySpeedrunCom from '@/components/BySpeedrunCom';
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
      useUser(root.$route.params.id).pipe(map(player => [player]))
    );

    /**
     * Find a player by name
     * @param {any} player
     * @param {array} source
     * @return {any} player
     */
    function find(player, source) {
      return source.find(p => p.name === player.name);
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

        let length = players.length;

        // remove the curre t players that aren't in the
        // new players
        while (length--) {
          const p = players.value[length];
          if (!find(p, newPlayers)) players.value.pop();
        }

        // add the new players that aren't already
        // in the list of current players
        newPlayers.forEach(p => {
          if (!find(p, players.value)) players.value.push(p);
        });
      } catch (e) {
        // save the error to hide the template
        error.value = e;
      }
    }

    // the id can either be a username or a run id
    watch(() => root.$route.params.id, effect, {
      immediate: true
    });

    return {
      isRunPage,
      isPlayerPage,
      players,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
aside {
  .sticky {
    top: calc(var(--navbar-height) + 1.5rem);
  }
}
</style>
