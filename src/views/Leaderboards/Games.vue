<template>
  <div id="games">
    <section class="section main">
      <div class="container">
        <div class="columns is-mobile is-multiline">
          <div
            v-for="game in games"
            :key="game.id"
            class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
          >
            <game-card
              class="game-card"
              :game="game"
              @click="to(game.abbreviation)"
            />
          </div>
        </div>
      </div>
    </section>
    <b-loading :is-full-page="false" :active="isLoading"></b-loading>
    <ss-footer />
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  name: "games",
  components: { GameCard },
  data: () => ({
    games: [],
    isLoading: false
  }),
  methods: {
    to(abbreviation) {
      this.$router.push({
        name: "game",
        params: { abbreviation }
      });
    }
  },
  async mounted() {
    this.isLoading = true;
    this.games = await this.$speedsouls.getGames();
    this.isLoading = false;
  }
};
</script>

<style scoped lang="scss">
#games {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .main {
    flex-grow: 1;

    .game-card {
      cursor: pointer;
    }
  }
}
</style>
