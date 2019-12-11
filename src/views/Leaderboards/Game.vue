<template>
  <div class="game" v-if="game">
    <div class="container sidebar-layout">
      <button
        @click="toggle"
        class="sidebar-button button is-large is-primary"
        :class="{ '-open': openSidebar }"
      >
        <b-icon class="sidebar-button_icon" pack="fas" :icon="buttonIcon"></b-icon>
      </button>
      <aside class="sidebar" :class="{ '-open': openSidebar }">
        <Categories
          class="categories"
          :categories="[...game.categories]"
          :active="category"
          @CategoryClick="onCategoryClick"
        />
      </aside>
      <div class="content" :class="{ '-open': openSidebar }">
        <header class="header">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li v-for="(b, i) in breadcrumbs" :key="i" :class="b.active ? 'is-active' : ''">
                <router-link :to="b.to">{{ b.text }}</router-link>
              </li>
            </ul>
          </nav>
        </header>
        <div class="seperator"></div>
        <div class="sub-categories" v-if="variables.filter(v => v['is-subcategory']).length">
          <Subcategory
            v-for="(v, i) in variables.filter(v => v['is-subcategory'])"
            :key="i"
            :subcategory="v"
          />
        </div>
        <div class="body">
          <Leaderboard :game="game" :category="category" :variables="variables" />
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
    variables: [],
    openSidebar: false
  }),
  components: {
    Categories,
    Subcategory,
    Leaderboard
  },
  methods: {
    onCategoryClick(category) {
      this.openSidebar = false;
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
    },
    toggle() {
      this.openSidebar = !this.openSidebar;
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
  async mounted() {
    this.game = await this.$speedsouls.getGame(this.$route.params.abbreviation);
    this.category = this.getCategoryFromHash() || this.game.categories[0];
  }
};
</script>

<style scoped lang="scss">
$sidebar-width: 300px;

.game {
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    flex-grow: 1;

    .sidebar-button {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
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
      position: -webkit-sticky;
      position: sticky;

      @include touch {
        position: fixed;
        z-index: $navbar-z - 2;
        overflow-y: scroll;
        top: navbar-height;
        height: 100%;
        width: 100%;
        transition: all $speed-slower;
        transform: translateY(100%);
        background-color: $white;

        .categories {
          padding-bottom: 4rem;
        }

        &.-open {
          transform: translateY(0);
        }
      }
    }

    .content {
      flex-grow: 1;
      transition: all $speed-slower;

      &.-open {
        opacity: .5;
      }
    }
  }
}

// #game {
//   display: flex;
//   flex-direction: row;
//   flex-grow: 1;

//   .game-horizontal-page {
//     position: relative;
//     display: flex;
//     flex-direction: row;
//     flex: 1;

//     .sidebar-button {
//       position: absolute;
//       right: 1rem;
//       bottom: 1rem;
//       cursor: pointer;
//       z-index: $navbar-z - 1;
//       display: none;
//       box-shadow: 1px 1px 15px $dark;
//       transition: all $speed-slow;
//       transform: translateX(-200%);

//       &.-open {
//         box-shadow: none;
//       }

//       @include touch {
//         display: block;
//         transform: translateX(0);
//       }
//     }

//     .sidebar {
//       position: relative;
//       display: flex;
//       flex-direction: column;
//       width: 20rem;
//       padding: 0 1rem;
//       background: $beige-lighter;
//       height: calc(100vh - #{$navbar-height});
//       overflow-y: scroll;

//       .categories {
//         position: sticky;
//         top: 1rem;
//       }

//       @include touch {
//         position: absolute;
//         z-index: $navbar-z - 2;
//         overflow-y: scroll;
//         bottom: 0;
//         height: 100%;
//         width: 100%;
//         transition: all $speed-slower;
//         transform: translateY(100%);
//         // transform: translateY(100%);

//         .categories {
//           padding-bottom: 4rem;
//         }

//         &.-open {
//           transform: translateY(0);
//         }
//       }
//     }

//     .main {
//       background: $white;
//       height: calc(100vh - #{$navbar-height});
//       width: 100%;
//       overflow-y: scroll;
//       display: flex;
//       flex-direction: column;
//       transition: all $speed-slower;

//       &.-open {
//         transform: scale(0.9);
//         opacity: 0;
//       }

//       .content {
//         padding: 0 1rem;
//         flex-grow: 1;

//         .header {
//           padding: 2rem 0;

//           .breadcrumb {
//             & > ul {
//               margin: 0;

//               & > li {
//                 margin-top: 4px;
//               }
//             }
//           }
//         }

//         .seperator {
//           border-bottom: 1px solid $beige-lighter;
//         }

//         .sub-categories {
//           margin-top: 2rem;
//         }

//         .body {
//           margin-top: 2rem;
//         }
//       }
//     }
//   }
// }
</style>
