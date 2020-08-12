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
import { useUser, useRuns } from '@/api/rx-souls';
import PlayerCard from '@/components/PlayerCard';
import { ref, computed, watch } from '@vue/composition-api';

export default {
  components: { PlayerCard },
  setup(props, { root }) {
    const isRunPage = computed(() => root.$route.name === 'Run');
    const isPlayerPage = computed(() => !isRunPage.value);
    const players = ref([]);

    function getFromRun() {
      return useRuns(root.$route.params.id)
        .toPromise()
        .then(({ players }) => players);
    }

    function getFromUser() {
      return useUser(root.$route.params.id)
        .toPromise()
        .then(player => [player]);
    }

    function find(player, source) {
      return source.find(p => p.name === player.name);
    }

    const playersPromise = computed(() =>
      isRunPage.value ? getFromRun() : getFromUser()
    );

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
