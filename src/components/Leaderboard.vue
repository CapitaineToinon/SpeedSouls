<template>
  <div v-if="leaderboardError" class="rejected">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >{{ leaderboardError.message }}</b-message
    >
  </div>
  <div v-else-if="!leaderboard" class="pending">
    <ss-loading :active="true" />
  </div>
  <div v-else-if="leaderboard && !leaderboard.length" class="rejected">
    <b-message title="Warning" type="is-warning" :closable="false"
      >There are no runs</b-message
    >
  </div>
  <div v-else class="fulfilled is-relative">
    <table class="table is-fullwidth">
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
          <th class="is-hidden-touch">
            <!-- empty for VOD -->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in leaderboard" :key="row.id" @click="onRowClick(row)">
          <td data-label="Rank">{{ row.place }}</td>

          <td data-label="Players">
            <div
              class="player"
              v-for="(player, i) in row.players"
              :key="`${row.id}-player-${i}`"
            >
              <b-tooltip
                v-if="player.country"
                :label="player.country.name"
                animated
              >
                <span
                  :class="`flag-icon flag-icon-${player.country.code}`"
                ></span>
              </b-tooltip>
              {{ player.name }}
            </div>
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

          <td class="is-hidden-touch">
            <b-icon
              v-if="row.showicon"
              pack="fas"
              icon="video"
              size="is-small"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLeaderboard } from "../api/rx-souls";
import { startWith, pluck, switchMap, map, catchError } from "rxjs/operators";

export default {
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
      this.leaderboardError = null;
      this.leaderboard = runs;
    },
    onLeaderboardError(error) {
      this.leaderboardError = error;
    },
    onRowClick({ id }) {
      this.$router.push({
        name: "run",
        params: {
          id
        }
      });
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("game", { immediate: true, deep: true }).pipe(
        pluck("newValue"),
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

<style lang="scss" scoped>
.fulfilled {
  table.table {
    td,
    th {
      text-align: center;
      vertical-align: middle;
    }

    thead {
      @include mobile {
        display: none;
      }
    }

    tbody {
      tr {
        cursor: pointer;

        @include desktop {
          &:hover {
            background-color: $table-row-hover-background-color;
          }
        }

        @include mobile {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: $card-shadow;
          margin-bottom: $size-6;

          td {
            text-align: right;
            position: relative;

            &::before {
              content: attr(data-label);
              font-weight: bold;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
