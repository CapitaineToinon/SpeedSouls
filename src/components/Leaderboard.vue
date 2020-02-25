<template>
  <div v-if="status.pending" class="rejected">
    <ss-loading :active="status.pending" />
  </div>
  <div v-else-if="status.rejected" class="rejected">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >Something broke</b-message
    >
  </div>
  <div v-else-if="status.fulfilled" class="fulfilled is-relative">
    <b-table
      class="actual-table"
      :class="{ 'is-hidden': status.pending }"
      :data="data"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :focusable="isFocusable"
      :loading="false"
      :mobile-cards="hasMobileCards"
      @click="onRowClick"
    >
      <template slot-scope="props">
        <b-table-column centered field="place" label="Rank">{{
          props.row.place
        }}</b-table-column>

        <b-table-column centered field="players" label="Players">
          <div
            class="player"
            v-for="(player, i) in props.row.players"
            :key="`${props.row.id}-player-${i}`"
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
        </b-table-column>

        <b-table-column
          centered
          field="primary_t"
          :label="props.row.primary_t.name"
          >{{ props.row.primary_t.time }}</b-table-column
        >

        <b-table-column
          centered
          v-for="(time, i) in props.row.others_t"
          :key="i"
          :label="time.name"
          >{{ time.time }}</b-table-column
        >

        <b-table-column
          centered
          v-for="variable in game.variables
            .filter(v => v.category === category.id)
            .filter(v => !v['is-subcategory'])"
          :key="variable.id"
          :label="variable.name"
        >
          <div v-if="props.row.values[variable.id]">
            {{ variable.values.values[props.row.values[variable.id]].label }}
          </div>
        </b-table-column>

        <b-table-column centered class="is-hidden-touch">
          <b-icon
            v-if="props.row.showicon"
            pack="fas"
            icon="video"
            size="is-small"
          ></b-icon>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import status from "@/mixins/status";
import { prepareGetLeaderboard } from "@/api/speedsouls";
const [getLeaderboard, cancel] = prepareGetLeaderboard();

export default {
  mixins: [status],
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
    data: [],
    isEmpty: false,
    isBordered: false,
    isStriped: false,
    isNarrowed: false,
    isHoverable: true,
    isFocusable: false,
    hasMobileCards: true
  }),
  watch: {
    game: {
      deep: true,
      immediate: true,
      handler: "fetchData"
    },
    category: {
      handler: "fetchData"
    }
  },
  methods: {
    async fetchData() {
      cancel(); // cancel current request if any
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        const runs = await getLeaderboard(
          this.game.id,
          this.category.id,
          this.game.variables.filter(v => v["is-subcategory"])
        );

        this.data = runs.map(run => {
          const primary_t = run.getPrimaryTime(this.game.ruleset);
          const others_t = run.getOtherTimes(this.game.ruleset);
          const players = run.players;

          return {
            id: run.id,
            place: run.place,
            showicon: run.showicon,
            weblink: run.weblink,
            values: run.values,
            primary_t,
            others_t,
            players
          };
        });
        this.status.fulfilled = true;
        this.status.rejected = false;
      } catch (e) {
        if (e.name === "AbortError") return;
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    },
    onRowClick(run) {
      if (this.status.pending) return;
      window.open(run.weblink, "_blank");
    }
  },
  unmount: cancel,
  destroyed: cancel
};
</script>

<style lang="scss" scoped>
.fulfilled {
  .actual-table {
    width: 100%;

    &::v-deep th:last-child {
      @extend .is-hidden-touch;
    }

    td {
      cursor: pointer;
    }
  }
}
</style>
