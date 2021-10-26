<template>
  <error v-if="gameError" :error="gameError" />
  <div v-else-if="!game" class="progress h-2 flex flex-row"></div>
  <div v-else class="flex flex-row">
    <button
      id="sidebar-button"
      ref="sidebarButtonRef"
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

      <error v-if="categoryError" :error="categoryError" />
      <div v-else-if="!category" class="progress h-2 flex flex-row"></div>
      <div v-else>
        <div
          class="subcategories flex flex-col justify-center align-middle items-stretch md:items-start"
        >
          <ButtonGroup
            class="mb-4"
            v-for="variable in category.variables.filter(
              v => v['is-subcategory']
            )"
            :key="variable.id"
            :options="variable.values.values"
            @change="v => (variable.values.default = v)"
            :active="variable.values.default"
          />
        </div>
        <Leaderboard
          :category="category"
          :variables="category.variables.filter(v => v['is-subcategory'])"
        />
      </div>
    </div>
  </div>
</template>

<script>
import clickOutside from '@/directives/clickOutside';
import useBodyLock from '@/mixins/bodyLocker';
import onResize from '@/mixins/onResize';
import Error from '@/components/Error.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Categories from '@/components/Categories.vue';
import Leaderboard from '@/components/Leaderboard.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { useSoulsGame, useSoulsCategory } from '@/api/rx-souls';
import { reactive, computed, toRefs, watch } from '@vue/composition-api';

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
  setup(props, { root, refs }) {
    const [lock, unlock] = useBodyLock();
    const gameParam = computed(() => root.$route.params.game);
    const categoryParam = computed(() => root.$route.params.category);

    const state = reactive({
      game: undefined,
      category: undefined,
      gameError: null,
      categoryError: null,
      openSidebar: false,
      metaTitle: undefined
    });

    // prevent the body from scrolling when sidebar is opened
    watch(
      () => state.openSidebar,
      (value, old) => {
        if (value === old) return;
        value ? lock() : unlock();
      }
    );

    // but close it on resize
    onResize(() => {
      state.openSidebar = false;
    });

    // Dynamic breacrumbs based on the game and category
    const breadcrumbs = computed(() => {
      const array = [
        {
          text: 'Leaderboards',
          to: { name: 'Games' }
        }
      ];

      if (state.game) {
        array.push({
          text: state.game.name,
          to: {},
          active: true
        });
      }

      if (state.category) {
        array.push({
          text: state.category.name,
          to: {},
          active: true
        });
      }

      return array;
    });

    // Go to category on click
    function onCategoryClick(category) {
      this.openSidebar = false;
      if (categoryParam.value === category.hash) return;

      root.$router.push({
        name: 'Game',
        params: {
          game: gameParam.value,
          category: category.hash
        }
      });
    }

    // close the aside menu
    function closeAside({ target }) {
      if (
        target === refs.sidebarButtonRef ||
        refs.sidebarButtonRef.contains(target)
      )
        return;
      state.openSidebar = false;
    }

    // fetch the game on route game param change
    // also reset the category
    watch(
      gameParam,
      async id => {
        if (!id) return;

        state.game = undefined;
        state.category = undefined;
        state.gameError = null;
        state.categoryError = null;

        try {
          const game = await useSoulsGame(id).toPromise();
          state.game = game;
        } catch (e) {
          state.gameError = e;
        }
      },
      { immediate: true }
    );

    // fetch the category on route game or category change
    watch(
      [gameParam, categoryParam],
      async ([gameId, categoryId]) => {
        if (!gameId || !categoryId) return;

        state.category = undefined;
        state.categoryError = null;

        try {
          const category = await useSoulsCategory(
            gameId,
            categoryId
          ).toPromise();
          Object.freeze(category);

          state.category = category;
        } catch (e) {
          state.categoryError = e;
        }
      },
      { immediate: true }
    );

    // Watch for game change and redirect to the first category if needed/possible
    watch(
      () => state.game,
      game => {
        if (!game) return;
        if (!categoryParam.value && game.categories.length) {
          root.$router.replace({
            name: 'Game',
            params: {
              game: game.abbreviation,
              category: game.categories[0].hash
            }
          });
        }
      }
    );

    return {
      ...toRefs(state),
      breadcrumbs,
      onCategoryClick,
      closeAside
    };
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
