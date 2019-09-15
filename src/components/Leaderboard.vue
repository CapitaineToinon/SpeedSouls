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
            <!-- <span v-if="player.weblink" @click.stop="onPlayerClick(player)">{{ player.getName() }}</span>
            <span v-else>{{ player.getName() }}</span>-->
            {{ player.getName() }}
          </div>
        </b-table-column>

        <b-table-column
          centered
          field="primary_t"
          :label="props.row.primary_t.getName()"
          >{{ props.row.primary_t.getTime() }}</b-table-column
        >

        <b-table-column
          centered
          v-for="(time, i) in props.row.others_t"
          :key="i"
          :label="time.getName()"
          >{{ time.getTime() }}</b-table-column
        >

        <b-table-column
          centered
          v-for="variable in variables.filter(v => !v['is-subcategory'])"
          :key="variable.id"
          :label="variable.name"
        >
          <div v-if="props.row.values[variable.id]">
            {{ variable.values[props.row.values[variable.id]].label }}
          </div>
        </b-table-column>

        <b-table-column centered>
          <b-icon
            v-if="props.row.showicon"
            icon="video"
            size="is-small"
          ></b-icon>
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
    },
    variables: {
      type: Array,
      require: true
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
    isLoading: false,
    hasMobileCards: true
  }),
  watch: {
    variables: {
      immediate: true,
      deep: true,
      handler() {
        this.update();
      }
    }
  },
  methods: {
    async update() {
      this.isLoading = true;
      this.data = [];

      const runs = await this.$speedsouls.getLeaderboard(
        this.game.id,
        this.category.id,
        this.variables.filter(v => v["is-subcategory"])
      );

      this.data = runs.map(run => {
        const primary_t = run.getPrimaryTime(this.game.ruleset);
        const others_t = run.getOtherTimes(this.game.ruleset);
        const players = run.players;

        return {
          id: run.id,
          place: run.place,
          showicon: run.showicon(),
          weblink: run.weblink,
          values: run.values,
          primary_t,
          others_t,
          players
        };
      });
      this.isLoading = false;
    },
    onRowClick(run) {
      if (this.isLoading) return;
      window.open(run.weblink, "_blank");
    },
    onPlayerClick(player) {
      // Todo
      // window.open(player.weblink, "_blank");
    }
  }
};
</script>

<style scoped>
table td {
  cursor: pointer;
}
</style>
