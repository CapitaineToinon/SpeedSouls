<template>
  <div v-if="status.pending" class="pending container">
    <div class="section">
      <ss-loading :active="true" />
    </div>
  </div>
  <div v-else-if="status.rejected" class="rejected container">
    <div class="section">
      <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        :closable="false"
        >{{ status.error.message }}</b-message
      >
    </div>
  </div>
  <div v-else-if="status.fulfilled" class="fulfilled container">
    <button
      @click="() => (openSidebar = !openSidebar)"
      class="sidebar-button button is-large is-primary"
      :class="{ '-open': openSidebar }"
    >
      <b-icon
        class="sidebar-button_icon"
        pack="fas"
        :icon="openSidebar ? 'times' : 'list'"
      ></b-icon>
    </button>
    <aside class="sidebar" :class="{ '-open': openSidebar }">
      <Categories
        class="categories"
        :categories="game.categories"
        :active="category"
        @CategoryClick="onCategoryClick"
      />
    </aside>
    <div class="section main-layout" :class="{ '-open': openSidebar }">
      <header class="header">
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
      <div class="sub-categories">
        <!-- TODO -->
      </div>
      <div class="leaderboard">
        <Leaderboard :game="game" :category="category" :variables="[]" />
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import Leaderboard from "@/components/Leaderboard.vue";

import status from "@/mixins/status";
import { prepareGetGame } from "@/api/speedsouls";

const [getGame, cancel] = prepareGetGame();

export default {
  name: "games",
  mixins: [status],
  components: {
    Categories,
    Leaderboard
  },
  data: () => ({
    game: null,
    openSidebar: false
  }),
  watch: {
    "$route.params.game": {
      immediate: true,
      handler(val, oldVal) {
        if (val === oldVal) return;
        this.fetchGame();
      }
    }
  },
  computed: {
    category() {
      if (!this.status.fulfilled) return null;

      return (
        this.game.categories.find(
          c =>
            decodeURIComponent(c.hash).toLowerCase() ===
            decodeURIComponent(this.$route.params.category).toLowerCase()
        ) || null
      );
    },
    breadcrumbs() {
      const array = [
        {
          text: "Leaderboards",
          to: { name: "new-games" }
        }
      ];

      if (this.game) {
        array.push({
          text: this.game.name,
          to: {},
          active: true
        });
      }

      if (this.category) {
        array.push({
          text: this.category.name,
          to: {},
          active: true
        });
      }

      return array;
    }
  },
  methods: {
    onCategoryClick(category) {
      if (category === this.category) return;

      this.$router.push({
        name: "new-game",
        params: {
          game: this.$route.params.game,
          category: category.hash.toLowerCase()
        }
      });
    },
    async fetchGame() {
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        const game = await getGame(this.$route.params.game);

        // If game has no categories, show an error
        if (!game.categories.length) {
          throw new Error("Game has no categories");
        }

        // If the category route param is underfined, we redirect to the first category we find
        if (this.$route.params.category === undefined) {
          this.$router.replace(
            `/new/${game.abbreviation}/${game.categories[0].hash}`
          );
        }

        this.game = game;
        this.status.fulfilled = true;
      } catch (e) {
        this.status.error = e;
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    }
  },
  unmounted: cancel,
  destroyed: cancel
};
</script>

<style scoped lang="scss">
.pending,
.rejected,
.fulfilled {
  min-height: calc(100vh - #{$navbar-height});
}

.fulfilled {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // position: relative;

  .sidebar-button {
    position: fixed;
    right: $size-4;
    bottom: $size-4;
    cursor: pointer;
    z-index: $navbar-z - 1;
    display: none;
    box-shadow: 1px 1px 15px $dark;
    transition: all $speed-slow;

    &.-open {
      box-shadow: none;
    }

    @include touch {
      display: block;
    }
  }

  .sidebar {
    width: $sidebar-width;
    max-height: calc(100vh - #{$navbar-height});
    overflow-y: auto;
    top: $navbar-height;
    padding: $size-1 0 $size-1 $size-4;
    position: -webkit-sticky;
    position: sticky;

    @include touch {
      position: fixed;
      z-index: $navbar-z - 2;
      overflow-y: scroll;
      padding: $size-1 $size-4;
      top: navbar-height;
      height: 100%;
      width: 100%;
      transition: all $speed-slower;
      transform: translateY(100%);
      background-color: $white;

      .categories {
        padding-bottom: $size-1 * 2;
      }

      &.-open {
        transform: translateY(0);
      }
    }
  }

  .main-layout {
    flex-grow: 1;
    transition: all $speed-slower;

    .breadcrumb,
    .sub-categories {
      margin-bottom: $size-4;
    }

    .leaderboards {
      width: auto;
    }

    &.-open {
      opacity: 0.5;
    }
  }
}
</style>
