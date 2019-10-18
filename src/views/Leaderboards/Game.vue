<template>
  <div id="game" v-if="game">
    <div class="sidebar-bg"></div>
    <div class="container game-horizontal-page">
      <aside class="sidebar">
        <Categories
          class="categories"
          :categories="game.categories"
          :active="category"
          @CategoryClick="onCategoryClick"
        />
      </aside>
      <div class="column content">
        <div class="container">
          <header class="content-header">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li
                  v-for="(b, i) in breadcrumbs"
                  :key="i"
                  :class="b.active ? 'is-active' : ''"
                >
                  <router-link :to="b.to">{{ b.text }}</router-link>
                </li>
              </ul>
            </nav>
          </header>
          <div class="seperator"></div>
          <div
            class="sub-categories"
            v-if="variables.filter(v => v['is-subcategory']).length"
          >
            <Subcategory
              v-for="(v, i) in variables.filter(v => v['is-subcategory'])"
              :key="i"
              :subcategory="v"
            />
          </div>
          <div class="content-main">
            <Leaderboard
              :game="game"
              :category="category"
              :variables="variables"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import Subcategory from "@/components/Subcategory.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "game",
  data: () => ({
    game: null,
    category: Object.apply(null),
    variables: []
  }),
  components: {
    Categories,
    Subcategory,
    Leaderboard
  },
  methods: {
    onCategoryClick(category) {
      this.category = category;
      this.updateHash(category);
      window.scrollTo({ top: 0 });
    },
    updateHash(category) {
      window.location.replace("#" + category.hash);
    },
    getCategoryFromHash() {
      return this.game.categories.find(category => {
        return window.location.hash === `#${category.hash}`;
      });
    }
  },
  watch: {
    category: {
      handler() {
        this.variables = this.game.variables
          .filter(v => v.category === this.category.id)
          .map(subc => {
            return {
              id: subc.id,
              name: subc.name,
              ["is-subcategory"]: subc["is-subcategory"],
              value: subc.values.default,
              values: subc.values.values
            };
          });
      }
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: "Leaderboards",
          to: { name: "games" }
        },
        {
          text: this.game.name,
          to: {},
          active: true
        },
        {
          text: this.category.name,
          to: {},
          active: true
        }
      ];
    }
  },
  async mounted() {
    this.game = await this.$speedsouls.getGame(this.$route.params.abbreviation);
    this.category = this.getCategoryFromHash() || this.game.categories[0];
  }
};
</script>

<style scoped lang="scss">
#game {
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  .sidebar-bg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 50%;
    z-index: -1;
    background: $beige-lighter;
  }

  .game-horizontal-page {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1;

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 18rem;
      padding: 2rem 1rem;
      background: $beige-lighter;

      .categories {
        position: sticky;
        top: 1rem;
      }
    }

    .content {
      background: $white;
      padding: 0 2rem;

      .content-header {
        padding: 2rem 0;

        .breadcrumb {
          & > ul {
            margin: 0;

            & > li {
              margin-top: 4px;
            }
          }
        }
      }

      .seperator {
        border-bottom: 1px solid $beige-lighter;
      }

      .sub-categories {
        margin-top: 2rem;
      }

      .content-main {
        padding: 2rem 0;
      }
    }
  }
}
</style>
