<template>
  <div v-if="leaderboardError" class="rejected">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >{{ leaderboardError }}</b-message
    >
  </div>
  <div v-else-if="!leaderboard" class="pending">
    <ss-loading :active="true" />
  </div>
  <div v-else class="fulfilled is-relative">
    <table class="table is-fullwidth is-hoverable has-text-centered">
      <tbody>
        <tr
          class="table-row"
          v-for="row in leaderboard"
          :key="row.id"
          @click="onRowClick(row)"
        >
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
import { startWith, pluck, switchMap, map } from "rxjs/operators";

export default {
  props: {
    game: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
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
    onRowClick(run) {
      window.open(run.weblink, "_blank");
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("game", { immediate: true, deep: true }).pipe(
        pluck("newValue"),
        switchMap(() =>
          useLeaderboard(this.game, this.category).pipe(
            map(leaderboard => leaderboard.runs),
            startWith(undefined)
          )
        )
      ),
      this.onLeaderboardSuccess,
      this.onLeaderboardError
    );

    this.$subscribeTo(
      this.$watchAsObservable("category.id", { immediate: true }).pipe(
        pluck("newValue"),
        switchMap(() =>
          useLeaderboard(this.game, this.category).pipe(
            map(leaderboard => leaderboard.runs),
            startWith(undefined)
          )
        )
      ),
      this.onLeaderboardSuccess,
      this.onLeaderboardError
    );
  },
  beforeDestroy() {
    console.log("destroying soon tm");
  }
};
</script>

<style lang="scss" scoped>
.fulfilled {
  .table {
    &-row {
      cursor: pointer;

      td {
        text-align: center;
      }

      @include touch {
        display: flex;
        flex-direction: column;
        box-shadow: $card-shadow;
        margin-bottom: $size-4;

        td {
          text-align: right;
          position: relative;
          height: 41px;

          &::before {
            content: attr(data-label);
            padding: $table-cell-padding;
            font-weight: bold;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>
