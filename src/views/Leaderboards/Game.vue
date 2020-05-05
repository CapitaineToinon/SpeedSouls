<template>
  <div v-if="gameError" class="min-h-screen-navbar container">
    <error :error="gameError" />
  </div>
  <div v-else-if="!game" class="min-h-screen-navbar container">
    <spinner />
  </div>
  <div v-else class="min-h-screen-navbar container flex flex-row">
    <button id="sidebar-button" @click="openSidebar = !openSidebar">
      <font-awesome-icon
        v-if="!openSidebar"
        :icon="['fas', 'list']"
        size="2x"
      />
      <font-awesome-icon v-else :icon="['fas', 'times']" size="2x" />
    </button>
    <aside :class="{ open: openSidebar }">
      <categories
        class="categories"
        :categories="game.categories"
        :active="$route.params.category"
        @click="onCategoryClick"
      />
    </aside>
    <div class="flex flex-col flex-grow overflow-x-scroll ml-0 md:ml-5">
      <breadcrumbs class="mb-4" :items="breadcrumbs" />
      <div
        class="subcategories flex flex-col justify-center align-middle items-stretch md:items-start"
      >
        <ButtonGroup
          class="mb-4"
          v-for="variable in subCategories"
          :key="variable.id"
          :options="variable.values.values"
          @change="v => (variable.values.default = v)"
          :active="variable.values.default"
        />
      </div>
      <Leaderboard
        :game="game"
        :category="category"
        :variables="subCategories"
      />
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { switchMap, pluck, catchError, skipWhile } from "rxjs/operators";
import { useSoulsGame, useSoulsCategory } from "@/api/rx-souls";
import Error from "@/components/Error";
import Breadcrumbs from "@/components/Breadcrumbs";
import Categories from "@/components/Categories.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import ButtonGroup from "@/components/ButtonGroup";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "games",
  components: {
    Error,
    ButtonGroup,
    Breadcrumbs,
    Categories,
    Leaderboard,
    Spinner
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
          to: { name: "Games" }
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
          name: "Game",
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
        name: "Game",
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
        skipWhile(v => v === undefined),
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

<style lang="scss" scoped>
#sidebar-button {
  @apply fixed;
  @apply z-20;
  @apply w-12;
  @apply h-12;
  @apply shadow-xl;
  @apply rounded;
  @apply bg-nord15;
  @apply text-nord6;
  right: 0.75rem;
  bottom: 0.75rem;

  @screen md {
    @apply hidden;
  }
}

aside {
  @apply fixed;
  @apply max-w-sm;
  @apply left-0;
  @apply right-0;
  @apply bottom-0;
  @apply z-10;
  @apply p-6;
  transition: transform 0.2s ease-in-out;
  transform: translateY(100vh);
  height: calc(100vh - var(--navbar-height));

  .categories {
    @apply w-full;

    @screen md {
      @apply flex-none;
      @apply w-64;
    }
  }

  &.open {
    transform: translateY(0);
  }

  @screen md {
    @apply relative;
    @apply w-64;
    @apply h-auto;
    @apply bg-transparent;
    @apply p-0;
    transform: translateY(0);
  }

  .categories {
    @apply sticky;
    top: calc(var(--navbar-height) + 1.5rem);
  }
}

:root.mode-dark {
  aside {
    @apply bg-nord1;
  }

  @screen md {
    aside {
      @apply bg-transparent;
    }
  }
}

:root:not(mode-dark) {
  aside {
    @apply bg-nord5;
  }

  @screen md {
    aside {
      @apply bg-transparent;
    }
  }
}
</style>
