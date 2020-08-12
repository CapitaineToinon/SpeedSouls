<template>
  <Promised :promise="gamePromise">
    <template #pending>
      <div class="min-h-screen-navbar container">
        <div class="progress h-2 flex flex-row"></div>
      </div>
    </template>

    <template #default="game">
      <div class="min-h-screen-navbar container flex flex-row">
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

          <Promised :promise="categoryPromise">
            <template #combined="{ data: category }">
              <div
                v-if="category"
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
                v-if="category"
                :category="category"
                :variables="category.variables.filter(v => v['is-subcategory'])"
              />
            </template>
          </Promised>
        </div>
      </div>
    </template>

    <template #rejected="error">
      <div class="min-h-screen-navbar container">
        <error :error="error" />
      </div>
    </template>
  </Promised>
</template>

<script>
import { useSoulsGame, useSoulsCategory } from '@/api/rx-souls';
import clickOutside from '@/directives/clickOutside';
import useBodyLock from '@/mixins/bodyLocker';
import onResize from '@/mixins/onResize';
import Error from '@/components/Error';
import Breadcrumbs from '@/components/Breadcrumbs';
import Categories from '@/components/Categories.vue';
import Leaderboard from '@/components/Leaderboard.vue';
import ButtonGroup from '@/components/ButtonGroup';
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

    const state = reactive({
      openSidebar: false,
      metaTitle: undefined,
      gameLink: undefined,
      categoryLink: undefined
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

    const breadcrumbs = computed({
      get: () => {
        const array = [
          {
            text: 'Leaderboards',
            to: { name: 'Games' }
          }
        ];

        if (state.gameLink) array.push(state.gameLink);
        if (state.categoryLink) array.push(state.categoryLink);
        return array;
      },
      set: value => (state.otherLinks = value)
    });

    const gamePromise = computed(() =>
      useSoulsGame(root.$route.params.game)
        .toPromise()
        .then(game => {
          if (!root.$route.params.category && game.categories.length) {
            root.$router.replace({
              name: 'Game',
              params: {
                game: root.$route.params.game,
                category: game.categories[0].hash
              }
            });
          }

          // breadcrumbs
          state.gameLink = {
            text: game.name,
            to: {},
            active: true
          };

          return game;
        })
    );

    const categoryPromise = computed(() =>
      useSoulsCategory(root.$route.params.game, root.$route.params.category)
        .toPromise()
        .then(category => {
          // breadcrumbs
          state.categoryLink = {
            text: category.name,
            to: {},
            active: true
          };

          return category;
        })
    );

    function onCategoryClick(category) {
      this.openSidebar = false;
      if (root.$route.params.category === category.hash) return;

      root.$router.push({
        name: 'Game',
        params: {
          game: root.$route.params.game,
          category: category.hash
        }
      });
    }

    function closeAside({ target }) {
      if (
        target === refs.sidebarButtonRef ||
        refs.sidebarButtonRef.contains(target)
      )
        return;
      state.openSidebar = false;
    }

    return {
      ...toRefs(state),
      breadcrumbs,
      gamePromise,
      categoryPromise,
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
