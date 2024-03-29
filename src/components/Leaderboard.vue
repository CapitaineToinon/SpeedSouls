<template>
  <error v-if="error" :error="error" />
  <div v-else-if="!leaderboard" class="progress flex h-2 flex-row" />
  <div v-else>
    <div v-if="!leaderboard.length" class="rejected">
      <alert type="warning">There are no runs.</alert>
    </div>
    <div v-else class="flex flex-col">
      <div class="responsive-table mb-4">
        <table class="text-center">
          <thead>
            <tr>
              <th class="shrink">Rank</th>
              <th class="shrink">Players</th>
              <th class="shrink">
                <span class="block md:hidden lg:block">{{
                  leaderboard[0].primary_t.name
                }}</span>
                <span class="hidden md:block lg:hidden">Time</span>
              </th>
              <th
                v-for="(time, i) in leaderboard[0].others_t"
                :key="`other-time-th-${i}`"
                class="table-cell shrink md:hidden lg:table-cell"
              >
                {{ time.name }}
              </th>
              <th
                v-for="variable in category.variables.filter(
                  (v) => !v['is-subcategory']
                )"
                :key="`th-${variable.id}`"
                class="table-cell shrink md:hidden lg:table-cell"
              >
                {{ variable.name }}
              </th>
              <th class="table-cell shrink md:hidden xl:table-cell">Date</th>
              <th class="hidden shrink xl:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in leaderboard"
              :key="row.id"
              @click="onRowClick(row)"
            >
              <td class="shrink" data-label="Rank">{{ row.place }}</td>

              <td class="expand player-names" data-label="Players">
                <player-name
                  v-for="(player, i) in row.players"
                  :key="`${row.id}-player-${i}`"
                  class="player-name"
                  :player="player"
                />
              </td>

              <td class="shrink" :data-label="row.primary_t.name">
                <span class="block md:hidden lg:block">{{
                  row.primary_t.time
                }}</span>
                <span class="hidden md:block lg:hidden">{{
                  row.time.time
                }}</span>
              </td>

              <td
                v-for="(time, i) in row.others_t"
                :key="`${row.id}-other-time-${i}`"
                class="table-cell shrink md:hidden lg:table-cell"
                :data-label="time.name"
              >
                {{ time.time }}
              </td>

              <td
                v-for="variable in category.variables.filter(
                  (v) => !v['is-subcategory']
                )"
                :key="variable.id"
                class="table-cell shrink md:hidden lg:table-cell"
                :data-label="variable.name"
              >
                <div v-if="row.values[variable.id]">
                  {{ variable.values.values[row.values[variable.id]].label }}
                </div>
              </td>

              <td
                v-if="relativeTime"
                class="table-cell shrink md:hidden xl:table-cell"
                data-label="Date"
              >
                {{ row.date | relativeDate }} ago
              </td>
              <td
                v-else
                class="table-cell shrink md:hidden xl:table-cell"
                data-label="Date"
              >
                {{ row.date | date }}
              </td>

              <td class="hidden shrink xl:table-cell">
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
      <by-speedrun-com class="text-center" />
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Error from '@/components/Error.vue';
import PlayerName from '@/components/PlayerName.vue';
import BySpeedrunCom from '@/components/BySpeedrunCom.vue';
import relativeDate from '@/filters/relativeDate';
import date from '@/filters/date';
import { useLeaderboard } from '@/api/rx-souls';
import { computed, reactive, toRefs, watch } from '@vue/composition-api';

export default {
  components: { Alert, Error, PlayerName, BySpeedrunCom },
  filters: {
    date,
    relativeDate,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
    variables: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { root }) {
    const state = reactive({
      leaderboard: undefined,
      error: null,
    });
    const relativeTime = computed(() => root.$store.getters.relativeTime);

    async function fetchLeaderboard(category, variables) {
      state.leaderboard = undefined;
      state.error = null;

      try {
        const { runs } = await useLeaderboard(category, variables).toPromise();
        Object.freeze(runs);

        state.leaderboard = runs;
      } catch (e) {
        state.error = e;
      }
    }

    function onRowClick({ id }) {
      root.$router.push({
        name: 'Run',
        params: {
          id,
        },
      });
    }

    function effect([category, variables]) {
      fetchLeaderboard(category, variables);
    }

    watch(() => [props.category, props.variables], effect, {
      immediate: true,
    });

    return {
      ...toRefs(state),
      relativeTime,
      onRowClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.player-names {
  .player-name:not(:first-child)::before {
    content: ',';
    @apply mr-2;
  }
}
</style>
