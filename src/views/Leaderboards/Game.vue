<template>
  <div v-if="gameError" class="rejected container">
    <div class="section">
      <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        :closable="false"
        >{{ gameError.message }}</b-message
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
    <div class="section">
      <div class="columns is-mobile">
        <div class="column left is-narrow">
          <aside class="sidebar" :class="{ '-open': openSidebar }">
            <Categories
              class="categories"
              :categories="game.categories"
              :active="$route.params.category"
              @CategoryClick="onCategoryClick"
            />
          </aside>
        </div>
        <div class="column right">
          <div
            v-if="categoryError"
            class="section main-layout"
            :class="{ '-open': openSidebar }"
          >
            <b-message
              title="Error"
              type="is-danger"
              aria-close-label="Close message"
              :closable="false"
              >{{ categoryError.message }}</b-message
            >
          </div>
          <div
            v-else-if="!category"
            class="section main-layout"
            :class="{ '-open': openSidebar }"
          >
            <ss-loading :active="true" />
          </div>
          <div v-else class="main-layout" :class="{ '-open': openSidebar }">
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
      </div>
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { switchMap, pluck, catchError, skipWhile } from "rxjs/operators";
import { useSoulsGame, useSoulsCategory } from "@/api/rx-souls";
import Categories from "@/components/Categories.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "games",
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
      if (!data) return;

      if (!this.$route.params.category && data.categories.length) {
        this.$router.replace({
          name: "game",
          params: {
            game: this.$route.params.game,
            category: data.categories[0].hash
          }
        });
      }

      this.gameError = null;
      this.game = data;
    },
    onGameError(error) {
      this.gameError = error;
      return of(undefined);
    },
    onCategorySuccess(category) {
      if (!category) return;

      this.categoryError = null;
      this.category = category;
    },
    onCategoryError(error) {
      this.categoryError = error;
      return of(undefined);
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
        switchMap(game => useSoulsGame(game).pipe(catchError(this.onGameError)))
      ),
      this.onGameSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable("$route.params.category", {
        immediate: true
      }).pipe(
        pluck("newValue"),
        skipWhile(v => v === undefined),
        switchMap(category =>
          useSoulsCategory(this.$route.params.game, category).pipe(
            catchError(this.onCategoryError)
          )
        )
      ),
      this.onCategorySuccess
    );
  }
};
</script>

<style scoped lang="scss">
.fulfilled {
  .column {
    &.left {
      width: $sidebar-width;

      @include touch {
        width: 100%;
        padding: 0;
      }
    }

    &.right {
      .breadcrumb,
      .sub-categories {
        margin-bottom: $size-4;
      }

      .main-layout {
        transition: $speed-slow;

        &.-open {
          opacity: 0;
        }
      }
    }
  }

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
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: calc(#{$navbar-height} + #{$section-padding-y});

    @include touch {
      position: fixed;
      top: $navbar-height;
      left: 0;
      right: 0;
      z-index: $navbar-z - 2;
      overflow-y: scroll;
      padding: $size-1 $size-4;
      top: navbar-height;
      height: 100%;
      transition: all $speed-slower;
      transform: translateY(100%);
      background-color: $scheme-main-ter;

      .categories {
        padding-bottom: $size-1 * 2;
      }

      &.-open {
        transform: translateY(0);
      }
    }
  }
}
</style>
