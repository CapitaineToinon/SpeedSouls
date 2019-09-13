<template>
  <div class="leaderboard" v-if="game && category">
    <b-table
      :data="isEmpty ? [] : data"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
    >
      <template slot-scope="props">
        <b-table-column field="place" label="Rank">
          {{ props.row.place }}
        </b-table-column>

        <b-table-column field="player_names" label="Players">
          {{ props.row.player_names }}
        </b-table-column>

        <b-table-column field="primary_t" label="Time">
          {{ props.row.primary_t }}
        </b-table-column>

        <b-table-column
          v-for="(time, i) in props.row.others_t"
          :key="i"
          :label="`Time ${i}`"
        >
          {{ time }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
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
    data: [],
    isEmpty: false,
    isBordered: true,
    isStriped: true,
    isNarrowed: false,
    isHoverable: false,
    isFocusable: false,
    isLoading: false,
    hasMobileCards: true
  }),
  watch: {
    category: {
      immediate: true,
      async handler() {
        this.isLoading = true;
        const runs = await this.$speedsouls.getLeaderboard(
          this.game.id,
          this.category.id
        );

        this.data = runs.map(run => {
          const primary_t = run.getPrimaryTime(this.game.ruleset);
          const others_t = run.getOtherTimes(this.game.ruleset);
          const player_names = run.players.map(p => p.getName()).join(", ");
          console.log(others_t);

          return {
            id: run.id,
            place: run.place,
            primary_t,
            others_t,
            player_names
          };
        });
        this.isLoading = false;
      }
    }
  },
  mounted() {}
};
</script>
