<template>
  <div class="container flex flex-col lg:flex-row flex-wrap">
    <aside
      v-if="players.length"
      class="w-full mb-5 gap-4 md:mb-0 lg:w-64"
      :class="{ 'order-2 lg:order-1': isRunPage }"
    >
      <player-card
        class="mb-4"
        v-for="(p, i) in players"
        :class="{ sticky: $route.name === 'Player' }"
        :key="i"
        :player="p"
        :showbutton="!isPlayerPage"
      />
    </aside>
    <div
      class="w-full md:flex-1 ml-0 lg:ml-5 mb-4 lg:mb-0"
      :class="{ 'order-1 lg:order-2': isRunPage }"
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
 * display because the child routes already do.
 *
 * Players is always an array, even on profiles, to simplify the logic.
 */
import { useUser, useRuns } from '@/api/rx-souls';
import PlayerCard from '@/components/PlayerCard';
import { ref, computed, watch } from '@vue/composition-api';

export default {
  components: { PlayerCard },
  setup(props, { root }) {
    const isRunPage = computed(() => root.$route.name === 'Run');
    const isPlayerPage = computed(() => !isRunPage.value);
    const players = ref([]);

    /**
     * Get the player from the run api
     * @return {Promise<any[]>}
     */
    function getFromRun() {
      return useRuns(root.$route.params.id)
        .toPromise()
        .then(({ players }) => players);
    }

    /**
     * Get the player from the user api
     * @return {Promise<any[]>}
     */
    function getFromUser() {
      return useUser(root.$route.params.id)
        .toPromise()
        .then(player => [player]);
    }

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
    // any loader or error handling in this route
    // because child routes already do it
    const playersPromise = computed(() =>
      isRunPage.value ? getFromRun() : getFromUser()
    );

    // watchEffect updating the players array
    // only remove or add players accordingly
    // to prevent the template to refresh
    // needlessly
    async function effect(id, old) {
      if (id === old) return;

      const newPlayers = await Promise.resolve(playersPromise.value);
      let length = players.length;

      // remove players if needed
      while (length--) {
        const p = players.value[length];
        if (!find(p, newPlayers)) players.value.pop();
      }

      // add new players if needed
      newPlayers.forEach(p => {
        if (!find(p, players.value)) players.value.push(p);
      });
    }

    // the id can either be a username or a run id
    watch(() => root.$route.params.id, effect, {
      immediate: true
    });

    return {
      isRunPage,
      isPlayerPage,
      players
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
