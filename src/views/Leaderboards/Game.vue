<template>
  <div v-if="gameError" class="min-h-screen-navbar container">
    <error :error="gameError" />
  </div>
  <div v-else-if="categoryError" class="min-h-screen-navbar container">
    <error :error="categoryError" />
  </div>
  <div v-else-if="!game || !category" class="min-h-screen-navbar container">
    <div class="progress h-2 flex flex-row"></div>
  </div>
  <div v-else class="min-h-screen-navbar container flex flex-row">
    <button
      id="sidebar-button"
      ref="sidebarButton"
      @click="openSidebar = !openSidebar"
      :class="{ open: openSidebar }"
    >
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
        v-click-outside="closeAside"
      />
    </aside>
    <div
      class="content flex flex-col flex-grow ml-0 md:ml-5"
      :class="{ open: openSidebar }"
    >
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
      <Leaderboard :category="category" :variables="subCategories" />
    </div>
  </div>
</template>

<script>
import { of } from 'rxjs';
import { switchMap, pluck, catchError, skipWhile, tap } from 'rxjs/operators';
import { useSoulsGame, useSoulsCategory } from '@/api/rx-souls';
import clickOutside from '@/directives/clickOutside';
import Error from '@/components/Error';
import Breadcrumbs from '@/components/Breadcrumbs';
import Categories from '@/components/Categories.vue';
import Leaderboard from '@/components/Leaderboard.vue';
import ButtonGroup from '@/components/ButtonGroup';

export default {
  metaInfo() {
    return {
      title: this.metaTitle
    };
  },
  directives: {
    clickOutside
  },
  components: {
    Error,
    ButtonGroup,
    Breadcrumbs,
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
    metaTitle() {
      if (this.game && this.category) {
        return `${this.game.name} ${this.category.name} Leaderboards`;
      }

      if (this.game) {
        return `${this.game.name} Leaderboards`;
      }

      return undefined;
    },
    breadcrumbs() {
      const array = [
        {
          text: 'Leaderboards',
          to: { name: 'Games' }
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
    subCategories() {
      return this.category.variables.filter(v => v['is-subcategory']);
    }
  },
  methods: {
    onGameSuccess(data) {
      if (!data) return;

      if (!this.$route.params.category && data.categories.length) {
        this.$router.replace({
          name: 'Game',
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
        name: 'Game',
        params: {
          game: this.$route.params.game,
          category: category.hash
        }
      });
    },
    closeAside({ target }) {
      if (
        target === this.$refs.sidebarButton ||
        this.$refs.sidebarButton.contains(target)
      )
        return;
      this.openSidebar = false;
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable('$route.params.game', { immediate: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        tap(() => (this.gameError = null)),
        switchMap(game => useSoulsGame(game).pipe(catchError(this.onGameError)))
      ),
      this.onGameSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable('$route.params.category', {
        immediate: true
      }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        tap(() => (this.categoryError = null)),
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
  @apply shadow-md;
  @apply rounded;
  @apply bg-nord15;
  @apply text-nord6;
  right: 0.75rem;
  bottom: 0.75rem;

  &.open {
    @apply bg-transparent;
    @apply shadow-none;
    @apply text-nord15;
  }

  @screen md {
    @apply hidden;
  }
}

aside {
  @apply fixed;
  @apply w-screen;
  @apply left-0;
  @apply right-0;
  @apply bottom-0;
  @apply z-10;
  @apply flex;
  @apply flex-row;
  @apply justify-end;
  @apply items-end;
  transition: transform 0.2s ease-in-out;
  transform: translateY(100vh);
  height: calc(100vh - var(--navbar-height));

  @screen md {
    @apply block;
  }

  .categories {
    @apply w-full;
    @apply p-3;
    @apply shadow-2xl;
    @apply overflow-y-scroll;
    @apply max-h-full;

    @screen md {
      @apply flex-none;
      @apply w-64;
      overflow: initial;
      @apply shadow-none;
      @apply p-0;
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

.content {
  @apply z-0;

  &::after {
    content: '';
    @apply fixed;
    @apply top-0;
    @apply right-0;
    @apply bottom-0;
    @apply left-0;
    @apply z-10;
    @apply pointer-events-none;
    @apply bg-black;
    @apply opacity-0;
    transition: opacity 0.2s ease-in-out;

    @screen md {
      @apply hidden;
    }
  }

  &.open {
    &::after {
      @apply opacity-75;
      @apply pointer-events-auto;
    }
  }
}

:root.mode-dark {
  .categories {
    @apply bg-nord1;
  }

  @screen md {
    .categories {
      @apply bg-transparent;
    }
  }
}

:root:not(mode-dark) {
  .categories {
    @apply bg-nord5;
  }

  @screen md {
    .categories {
      @apply bg-transparent;
    }
  }
}
</style>
