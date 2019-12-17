<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-multiline">
        <div
          v-for="game in games"
          :key="game.id"
          class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
        >
          <game-card
            :game="game"
            :to="{
              name: 'game',
              params: { abbreviation: game.abbreviation }
            }"
          />
        </div>
      </div>
    </div>
    <b-loading :is-full-page="false" :active="isLoading"></b-loading>
  </section>
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
  async mounted() {
    this.isLoading = true;
    this.games = await this.$speedsouls.getGames();
    this.isLoading = false;
  }
};
</script>

<style scoped lang="scss">
// #games {
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;

//   .main {
//     flex-grow: 1;
//   }
// }
</style>
