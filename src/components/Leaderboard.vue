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
          {{
          props.row.place
          }}
        </b-table-column>

        <b-table-column field="player_names" label="Players">
          {{
          props.row.player_names
          }}
        </b-table-column>

        <b-table-column field="primary_t" label="Time">
          {{
          props.row.primary_t
          }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
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
    isBordered: false,
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
          const primary_t = run.getPrimaryTime();

          console.log(run);
          const player_names = run.players.map(p => p.getName()).join(", ");

          return {
            id: run.id,
            place: run.place,
            primary_t,
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
