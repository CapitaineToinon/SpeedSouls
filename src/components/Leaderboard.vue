<template>
  <div v-if="leaderboardError" class="rejected">
    <alert type="danger">{{ leaderboardError.message }}</alert>
  </div>
  <div v-else-if="!leaderboard" class="pending">
    <div class="progress h-2 flex flex-row"></div>
  </div>
  <div v-else-if="leaderboard && !leaderboard.length" class="rejected">
    <alert type="warning">There are no runs.</alert>
  </div>
  <div v-else class="fulfilled responsive-table">
    <table class="text-center">
      <thead>
        <tr>
          <th class="shrink">Rank</th>
          <th class="shrink">Players</th>
          <th class="shrink">
            <span class="block md:hidden lg:block">
              {{ leaderboard[0].primary_t.name }}
            </span>
            <span class="hidden md:block lg:hidden">Time</span>
          </th>
          <th
            class="shrink table-cell md:hidden lg:table-cell"
            v-for="(time, i) in leaderboard[0].others_t"
            :key="`other-time-th-${i}`"
          >
            {{ time.name }}
          </th>
          <th
            class="shrink table-cell md:hidden lg:table-cell"
            v-for="variable in game.variables
              .filter(v => v.category === category.id)
              .filter(v => !v['is-subcategory'])"
            :key="`th-${variable.id}`"
          >
            {{ variable.name }}
          </th>
          <th class="shrink table-cell md:hidden xl:table-cell">Date</th>
          <th class="shrink hidden xl:table-cell"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in leaderboard" :key="row.id" @click="onRowClick(row)">
          <td class="shrink" data-label="Rank">{{ row.place }}</td>

          <td class="expand player-names" data-label="Players">
            <player-name
              class="player-name"
              v-for="(player, i) in row.players"
              :key="`${row.id}-player-${i}`"
              :player="player"
            />
          </td>

          <td class="shrink" :data-label="row.primary_t.name">
            <span class="block md:hidden lg:block">
              {{ row.primary_t.time }}
            </span>
            <span class="hidden md:block lg:hidden">{{ row.time.time }}</span>
          </td>

          <td
            class="shrink table-cell md:hidden lg:table-cell"
            v-for="(time, i) in row.others_t"
            :key="`${row.id}-other-time-${i}`"
            :data-label="time.name"
          >
            {{ time.time }}
          </td>

          <td
            class="shrink table-cell md:hidden lg:table-cell"
            v-for="variable in game.variables
              .filter(v => v.category === category.id)
              .filter(v => !v['is-subcategory'])"
            :key="variable.id"
            :data-label="variable.name"
          >
            <div v-if="row.values[variable.id]">
              {{ variable.values.values[row.values[variable.id]].label }}
            </div>
          </td>

          <td
            v-if="relativeTime"
            class="shrink table-cell md:hidden xl:table-cell"
            data-label="Date"
          >
            {{ row.date | relativeDate }} ago
          </td>
          <td
            v-else
            class="shrink table-cell md:hidden xl:table-cell"
            data-label="Date"
          >
            {{ row.date | date }}
          </td>

          <td class="shrink hidden xl:table-cell">
            <font-awesome-icon v-if="row.showicon" :icon="['fas', 'video']" />
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
</template>

<script>
import { of } from 'rxjs';
import {
  startWith,
  skipWhile,
  pluck,
  switchMap,
  map,
  catchError
} from 'rxjs/operators';
import { useLeaderboard } from '@/api/rx-souls';
import Alert from '@/components/Alert';
import PlayerName from '@/components/PlayerName';
import { mapState } from 'vuex';

export default {
  components: { Alert, PlayerName },
  props: {
    game: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    variables: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    leaderboard: undefined,
    leaderboardError: null
  }),
  computed: {
    ...mapState(['relativeTime'])
  },
  methods: {
    onLeaderboardSuccess(runs) {
      this.leaderboard = runs;
    },
    onLeaderboardError(error) {
      this.leaderboardError = error;
      return of(undefined);
    },
    onRowClick(row) {
      this.$router.push({
        name: 'Run',
        params: {
          id: row.id
        }
      });
    },
    getLeaderboard() {
      return useLeaderboard(this.game, this.category, this.variables).pipe(
        map(leaderboard => leaderboard.runs),
        startWith(undefined),
        catchError(this.onLeaderboardError)
      );
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable('game', { immediate: true, deep: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        switchMap(() => this.getLeaderboard())
      ),
      this.onLeaderboardSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable('category.id', { immediate: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        switchMap(() => this.getLeaderboard())
      ),
      this.onLeaderboardSuccess
    );
  }
};
</script>

<style lang="scss" scoped>
.player-names {
  .player-name:not(:first-child)::before {
    content: ',';
    @apply mr-2;
  }
}

// table.loading {
//   @apply relative;
//   @apply pointer-events-none;

//   &::after {
//     @apply absolute;
//     content: "";
//     @apply top-0;
//     @apply right-0;
//     @apply bottom-0;
//     @apply left-0;
//     @apply bg-nord4;
//     @apply opacity-50;
//   }
// }
</style>
