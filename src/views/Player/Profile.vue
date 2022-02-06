<template>
  <error v-if="error" :error="error" />
  <div v-else-if="pbs === undefined" class="progress flex h-2 flex-row" />
  <div v-else>
    <alert v-if="pbs.length === 0" type="info" class="mb-6 w-full"
      >The are no runs.</alert
    >
    <div
      v-for="(group, i) in pbs"
      :key="i"
      class="mb-4 flex w-full flex-col justify-center"
    >
      <breadcrumbs
        class="pb-3"
        :items="[
          {
            text: 'Leaderboards',
            to: { name: 'Games' },
          },
          {
            text: group.game.name,
            to: {
              name: 'Game',
              params: {
                game: group.game.abbreviation,
              },
            },
          },
        ]"
      />

      <div class="responsive-table rounded-none">
        <table class="rounded-none text-center">
          <thead>
            <tr>
              <th class="shrink">Rank</th>
              <th class="expand">Category</th>
              <th class="shrink">Time</th>
              <th class="shrink">Date</th>
              <th class="hidden shrink lg:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in group.runs"
              :key="row.id"
              @click="onRowClick(row)"
            >
              <td class="shrink" data-label="Rank">{{ row.place }}</td>
              <td class="expand" data-label="Category">
                {{ row.category.name }}
                <span
                  v-for="(value, varId) in row.values"
                  :key="varId"
                  class="text-nord1 dark:text-nord4"
                >
                  ({{ getVariableName(row.category.variables, varId, value) }})
                </span>
              </td>
              <td class="shrink" data-label="Time">
                {{ row.primary_t.time }}
              </td>

              <td v-if="relativeTime" class="shrink" data-label="Date">
                {{ row.date | relativeDate }} ago
              </td>
              <td v-else class="shrink" data-label="Date">
                {{ row.date | date }}
              </td>
              <td class="hidden shrink lg:table-cell">
                <font-awesome-icon
                  v-if="row.showicon"
                  :icon="['fas', 'video']"
                />
                <font-awesome-icon
                  v-else
                  class="text-nord11"
                  :icon="['fas', 'video-slash']"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex w-full flex-col">
      <by-speedrun-com class="text-center" />
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Error from '@/components/Error.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';
import relativeDate from '@/filters/relativeDate';
import date from '@/filters/date';
import { computed, watch, reactive, toRefs } from '@vue/composition-api';
import { useUserPersonalBests, useUser } from '@/api/rx-souls';

export default {
  metaInfo() {
    return {
      title: this.metaTitle,
    };
  },
  components: { Alert, Error, Breadcrumbs, BySpeedrunCom },
  filters: {
    date,
    relativeDate,
  },
  setup(props, { root }) {
    const state = reactive({
      player: undefined,
      pbs: undefined,
      error: null,
    });
    const metaTitle = computed(() => state.player?.name || undefined);
    const relativeTime = computed(() => root.$store.getters.relativeTime);

    async function effect(id) {
      if (!id) return;

      state.e = null;
      state.player = undefined;
      state.pbs = undefined;

      try {
        const [_player, _pbs] = await Promise.all([
          useUser(id).toPromise(),
          useUserPersonalBests(id).toPromise(),
        ]);

        Object.freeze(_player);
        Object.freeze(_pbs);

        state.player = _player;
        state.pbs = _pbs;
      } catch (e) {
        state.error = e;
      }
    }

    function getVariableName(variables, id, value) {
      return variables.find((v) => v.id === id)?.values.values[value]?.label;
    }

    function onRowClick({ id }) {
      root.$router.push({
        name: 'Run',
        params: {
          id,
        },
      });
    }

    watch(() => root.$route.params.id, effect, { immediate: true });

    return {
      ...toRefs(state),
      relativeTime,
      metaTitle,
      getVariableName,
      onRowClick,
    };
  },
};
</script>
