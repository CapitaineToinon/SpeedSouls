<template>
  <div id="games">
    <section class="section main">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="card">
              <div class="card-content">
                <b-menu-list label="Games">
                  <b-menu-item
                    class="game"
                    v-for="(game, i) in games"
                    :key="i"
                    icon="information-outline"
                    :label="game.name"
                    tag="router-link"
                    :to="{
                      name: 'game',
                      params: { abbreviation: game.abbreviation }
                    }"
                  ></b-menu-item>
                  <b-loading
                    :active="isLoading"
                    :is-full-page="false"
                  ></b-loading>
                </b-menu-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ss-footer />
  </div>
</template>

<script>
export default {
  name: "games",
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
#games {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .main {
    flex-grow: 1;
  }

  .game {
    ::v-deep .is-active {
      background-color: inherit;
      color: inherit;
    }
  }
}
</style>
