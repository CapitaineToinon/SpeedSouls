<template>
  <error v-if="error" :error="error" />
  <div v-else>
    <breadcrumbs class="pb-3" :items="breadcrumbs" :loading="isPending" />

    <alert
      v-if="run && run.status.status === 'rejected'"
      type="danger"
      class="mb-3"
    >
      <template #header>Rejected</template>
      {{ run.status.reason }}
    </alert>

    <alert
      v-if="run && run.status.status === 'new'"
      type="warning"
      class="mb-3"
    >
      <template #header>Awaiting verification</template>
      A moderator needs to verify this run before it appears on the leaderboard.
    </alert>

    <div class="overflow-hidden rounded bg-nord5 shadow-md dark:bg-nord1">
      <div v-if="!run" class="w-full">
        <div class="speedsouls-video inverted"></div>
      </div>
      <div v-else-if="run && run.videos && run.videos.links" class="w-full">
        <run-video
          v-for="(link, i) in run.videos.links"
          :key="i"
          :url="link.uri"
        ></run-video>
      </div>
      <div v-else class="p-4">
        <alert type="warning">No video.</alert>
      </div>
      <div v-if="isPending" class="px-6 py-4">
        <div class="is-skeleton dark:is-dark mb-3 w-1/2 rounded pb-6"></div>
        <div class="is-skeleton dark:is-dark mb-3 w-1/3 rounded pb-4"></div>
      </div>
      <div v-else class="px-6 py-4">
        <div class="text-xl text-nord0 dark:text-nord6">
          <router-link :to="to(run.game, run.category)">
            {{ run.category.name }}
          </router-link>
          <span
            v-for="(value, varId) in run.values"
            :key="varId"
            class="text-nord1 dark:text-nord4"
          >
            ({{ getVariableName(run.category.variables, varId, value) }})
          </span>
          in {{ run.primary_t.time }} by
          <span class="player-names">
            <player-name
              v-for="(player, i) in run.players"
              :key="`player-${i}`"
              class="player-name"
              :class="{ 'cursor-pointer': !!player.id }"
              :player="player"
              @click="onPlayerClick"
            />
          </span>
        </div>
        <p class="text-base text-nord1 dark:text-nord4">
          {{ run.date | date }}
        </p>
        <p
          v-if="run.comment"
          class="mt-5 text-base italic text-nord1 dark:text-nord4"
        >
          {{ run.comment }}
        </p>
      </div>
    </div>
    <div class="mt-5 hidden w-full flex-col lg:flex">
      <by-speedrun-com class="text-center" />
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Error from '@/components/Error.vue';
import RunVideo from '@/components/RunVideo.vue';
import PlayerName from '@/components/PlayerName.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';
import date from '@/filters/date';
import { useRuns } from '@/api/rx-souls';
import { reactive, computed, toRefs, watch } from '@vue/composition-api';

export default {
  metaInfo() {
    return {
      title: this.metaTitle,
    };
  },
  components: {
    Alert,
    Error,
    Breadcrumbs,
    RunVideo,
    PlayerName,
    BySpeedrunCom,
  },
  filters: {
    date,
  },
  setup(props, { root }) {
    const state = reactive({
      run: undefined,
      error: null,
    });

    const isPending = computed(() => state.run === undefined);

    const metaTitle = computed(() => {
      if (!state.run) return undefined;

      const game = state.run.game;
      const category = state.run.category;
      const time = state.run.primary_t;
      const players = state.run.players.map((p) => p.name).join(', ');
      return `${game.name} ${category.name} in ${time.time} by ${players}`;
    });

    const breadcrumbs = computed(() => {
      const base = [
        {
          text: 'Leaderboards',
          to: { name: 'Games' },
        },
      ];

      if (!state.run) return base;

      const game = state.run.game;
      const category = state.run.category;
      const time = state.run.primary_t;
      const players = state.run.players.map((p) => p.name).join(', ');

      const array = [
        ...base,
        {
          text: game.name,
          to: {
            name: 'Game',
            params: {
              game: game.abbreviation,
            },
          },
          active: false,
        },
        {
          text: category.name,
          to: {
            name: 'Game',
            params: {
              game: game.abbreviation,
              category: category.hash,
            },
          },
          active: false,
        },

        {
          text: `${time.time} by ${players}`,
          to: {},
          active: true,
        },
      ];

      return array;
    });

    async function effect(id) {
      if (!id) return;

      state.error = null;
      state.run = undefined;

      try {
        const run = await useRuns(id).toPromise();
        Object.freeze(run);
        state.run = run;
      } catch (e) {
        state.error = e;
      }
    }

    function to(game, category) {
      return {
        name: 'Game',
        params: {
          game: game.abbreviation,
          category: category.hash,
        },
      };
    }

    function onPlayerClick(player) {
      if (!player.id) return;
      root.$router.push({
        name: 'Player',
        params: {
          id: player.name,
        },
      });
    }

    function getVariableName(variables, id, value) {
      return variables.find((v) => v.id === id)?.values.values[value]?.label;
    }

    // react to route changes
    watch(() => root.$route.params.id, effect, { immediate: true });

    return {
      ...toRefs(state),
      isPending,
      breadcrumbs,
      metaTitle,
      to,
      onPlayerClick,
      getVariableName,
    };
  },
};
</script>

<style lang="scss" scoped>
.player:not(:last-child) {
  @apply mb-4;
}

.player-names {
  .player-name:not(:first-child)::before {
    content: ',';
    @apply mr-2;
  }
}
</style>
