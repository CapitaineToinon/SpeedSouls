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
        >Something broke</b-message
      >
    </div>
  </div>
  <div v-else-if="status.fulfilled" class="fulfilled container">
    <button
      @click="toggle"
      class="sidebar-button button is-large is-primary"
      :class="{ '-open': openSidebar }"
    >
      <b-icon
        class="sidebar-button_icon"
        pack="fas"
        :icon="buttonIcon"
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
      <div class="leaderboard">
        <Leaderboard :game="game" :category="category" :variables="variables" />
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import Subcategory from "@/components/Subcategory.vue";
import Leaderboard from "@/components/Leaderboard.vue";

import status from "@/mixins/status";
import { prepareGetGame } from "../../api/speedsouls";
const [getGame, cancel] = prepareGetGame();

export default {
  name: "game",
  mixins: [status],
  data: () => ({
    game: null,
    category: Object.apply(null),
    variables: [],
    openSidebar: false
  }),
  components: {
    Categories,
    Subcategory,
    Leaderboard
  },
  methods: {
    async fetchData() {
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        this.game = await getGame(this.$route.params.abbreviation);
        this.category = this.getCategoryFromHash() || this.game.categories[0];
        this.status.fulfilled = true;
      } catch (e) {
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    },
    onCategoryClick(category) {
      this.openSidebar = false;
      this.updateHash(category);
      window.scrollTo({ top: 0 });
    },
    onhashchange() {
      this.category = this.getCategoryFromHash();
    },
    updateHash(category) {
      window.location.replace("#" + category.hash);
    },
    getCategoryFromHash() {
      return this.game.categories.find(category => {
        return window.location.hash === `#${category.hash}`;
      });
    },
    toggle() {
      this.openSidebar = !this.openSidebar;
    }
  },
  watch: {
    game: {
      immediate: true,
      handler() {
        if (this.game && this.game.name) {
          document.title = `SpeedSouls - ${this.game.name} Leaderboards`;
        } else {
          document.title = "SpeedSouls";
        }
      }
    },
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
    buttonIcon() {
      return this.openSidebar ? "times" : "list";
    },
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
  mounted() {
    this.fetchData();
    window.addEventListener("hashchange", this.onhashchange);
  },
  unmounted() {
    cancel();
    window.removeEventListener("hashchange", this.onhashchange);
  },
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
