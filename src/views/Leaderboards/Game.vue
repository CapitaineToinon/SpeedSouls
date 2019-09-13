<template>
  <div id="game" v-if="game">
    <div class="columns is-marginless">
      <div class="column is-3 sidebar">
        <Categories :categories="game.categories" @CategoryClick="onCategoryClick" />
      </div>
      <div class="column content">
        <Leaderboard :game="game" :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  data: () => ({
    game: null,
    category: Object.apply(null)
  }),
  components: {
    Categories,
    Leaderboard
  },
  methods: {
    onCategoryClick(category) {
      this.category = category;
    }
  },
  async mounted() {
    this.game = await this.$speedsouls.getGame(this.$route.params.abbreviation);
    this.category = this.game.categories[0];
  }
};
</script>

<style></style>
