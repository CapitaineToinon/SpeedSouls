<template>
  <div id="games">
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="card">
              <div class="card-content">
                <b-menu-list label="Games">
                  <b-menu-item
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
  </div>
</template>

<script>
export default {
  name: "games",
  data: () => ({
    games: [],
    active: null,
    isLoading: false
  }),
  activated() {
    this.active = null; // prevents the active style
  },
  deactivated() {
    this.active = null; // prevents the active style
  },
  async mounted() {
    this.isLoading = true;
    this.games = await this.$speedsouls.getGames();
    this.isLoading = false;
  }
};
</script>

<style lang="scss">
// Disable selection
a.is-active {
  background: inherit !important;
  color: inherit !important;
}
</style>
