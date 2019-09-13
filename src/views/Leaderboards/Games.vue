<template>
  <div id="games">
    <!-- <div class="columns is-multiline">
      <div class="column is-4" v-for="game in games" :key="game.id">
        <router-link to="/">
          <figure class="image">
            <img :src="game.background" alt="Placeholder image" />
          </figure>
        </router-link>
      </div>
    </div>-->
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
  data: () => ({
    games: []
  }),
  async mounted() {
    this.games = await this.$speedsouls.getGames();
  }
};
</script>
