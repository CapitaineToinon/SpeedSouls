<template>
  <div v-if="leaderboardError" class="rejected">
    <alert type="danger">{{ leaderboardError.message }}</alert>
  </div>
  <div v-else-if="!leaderboard" class="pending">
    <spinner />
  </div>
  <div v-else-if="leaderboard && !leaderboard.length" class="rejected">
    <alert type="warning">There are no runs.</alert>
  </div>
  <table v-else class="fulfilled">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Players</th>
        <th>{{ leaderboard[0].primary_t.name }}</th>
        <th
          v-for="(time, i) in leaderboard[0].others_t"
          :key="`other-time-th-${i}`"
        >
          {{ time.name }}
        </th>
        <th
          v-for="variable in game.variables
            .filter(v => v.category === category.id)
            .filter(v => !v['is-subcategory'])"
          :key="`th-${variable.id}`"
        >
          {{ variable.name }}
        </th>
        <th class="hidden lg:table-cell"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in leaderboard" :key="row.id" @click="onRowClick(row)">
        <td data-label="Rank">{{ row.place }}</td>

        <td data-label="Players">
          <player-name
            v-for="(player, i) in row.players"
            :key="`${row.id}-player-${i}`"
            :player="player"
          />
        </td>

        <td :data-label="row.primary_t.name">{{ row.primary_t.time }}</td>

        <td
          v-for="(time, i) in row.others_t"
          :key="`${row.id}-other-time-${i}`"
          :data-label="time.name"
        >
          {{ time.time }}
        </td>

        <td
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

        <td class="hidden lg:table-cell">
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
</template>

<script>
import { of } from "rxjs";
import {
  startWith,
  skipWhile,
  pluck,
  switchMap,
  map,
  catchError
} from "rxjs/operators";
import { useLeaderboard } from "@/api/rx-souls";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import PlayerName from "@/components/PlayerName";

export default {
  components: { Alert, Spinner, PlayerName },
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
    leaderboardError: null,
    isEmpty: false,
    isBordered: false,
    isStriped: false,
    isNarrowed: false,
    isHoverable: true,
    isFocusable: false,
    hasMobileCards: true
  }),
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
        name: "Run",
        params: {
          id: row.id
        }
      });
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("game", { immediate: true, deep: true }).pipe(
        pluck("newValue"),
        skipWhile(v => v === undefined),
        switchMap(() =>
          useLeaderboard(this.game, this.category, this.variables).pipe(
            map(leaderboard => leaderboard.runs),
            startWith(undefined),
            catchError(this.onLeaderboardError)
          )
        )
      ),
      this.onLeaderboardSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable("category.id", { immediate: true }).pipe(
        pluck("newValue"),
        skipWhile(v => v === undefined),
        switchMap(() =>
          useLeaderboard(this.game, this.category, this.variables).pipe(
            map(leaderboard => leaderboard.runs),
            startWith(undefined),
            catchError(this.onLeaderboardError)
          )
        )
      ),
      this.onLeaderboardSuccess
    );
  }
};
</script>
