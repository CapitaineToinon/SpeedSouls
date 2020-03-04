<template>
  <div v-if="gameError" class="rejected container">
    <div class="section">
      <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        :closable="false"
        >{{ gameError }}</b-message
      >
    </div>
  </div>
  <div v-else-if="!game" class="pending container">
    <div class="section">
      <ss-loading :active="true" />
    </div>
  </div>
  <div v-else class="fulfilled container">
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
        :active="$route.params.category"
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
        <b-field v-for="variable in subCategories" :key="variable.id">
          <b-radio-button
            v-for="(option, id) in variable.values.values"
            :key="id"
            :native-value="id"
            v-model="variable.values.default"
          >
            <span>{{ option.label }}</span>
          </b-radio-button>
        </b-field>
      </div>
      <div class="leaderboard">
        <Leaderboard
          :game="game"
          :category="category"
          :variables="subCategories"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { switchMap, pluck } from "rxjs/operators";
import { useSoulsGame, useSoulsCategory } from "../../api/rx-souls";
import Categories from "@/components/Categories.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "games",
  mixins: [status],
  components: {
    Categories,
    Leaderboard
  },
  data: () => ({
    game: undefined,
    gameError: null,
    category: undefined,
    categoryError: null,
    openSidebar: false
  }),
  computed: {
    breadcrumbs() {
      const array = [
        {
          text: "Leaderboards",
          to: { name: "games" }
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
    },
    categoryVariables() {
      return this.game.variables.filter(v => v.category === this.category.id);
    },
    subCategories() {
      return this.categoryVariables.filter(v => v["is-subcategory"]);
    }
  },
  methods: {
    onGameSuccess(data) {
      this.gameError = null;

      if (!this.$route.params.category && data.categories.length) {
        this.$router.replace({
          name: "game",
          params: {
            game: this.$route.params.game,
            category: data.categories[0].hash
          }
        });
      }

      this.game = data;
    },
    onGameError(error) {
      this.gameError = error;
    },
    onCategorySuccess(category) {
      this.categoryError = null;
      this.category = category;
    },
    onCategoryError(error) {
      this.categoryError = error;
    },
    onCategoryClick(category) {
      this.openSidebar = false;
      if (this.category === category) return;

      this.$router.push({
        name: "game",
        params: {
          game: this.$route.params.game,
          category: category.hash
        }
      });
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("$route.params.game", { immediate: true }).pipe(
        pluck("newValue"),
        switchMap(game => useSoulsGame(game))
      ),
      this.onGameSuccess,
      this.onGameError
    );

    this.$subscribeTo(
      this.$watchAsObservable("$route.params.category", {
        immediate: true
      }).pipe(
        pluck("newValue"),
        switchMap(category =>
          useSoulsCategory(this.$route.params.game, category)
        )
      ),
      this.onCategorySuccess,
      this.onCategoryError
    );
  }
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

  .sidebar-button {
    position: fixed;
    right: $size-4;
    bottom: $size-4;
    cursor: pointer;
    z-index: $navbar-z - 1;
    display: none;
    box-shadow: 1px 1px 15px $dark;

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
