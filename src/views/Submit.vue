<template>
  <div v-if="error" class="rejected has-fixed-navbar-top">
    <b-message
      title="Error"
      type="is-danger"
      aria-close-label="Close message"
      :closable="false"
      >{{ error.message }}</b-message
    >
  </div>
  <div v-else-if="!games" class="pending container has-fixed-navbar-top">
    <ss-loading />
  </div>
  <div v-else class="fulfilled container has-fixed-navbar-top">
    <div class="section">
      <div class="columns is-mobile is-multiline">
        <div class="column is-full">
          <h1 class="has-text-light is-full has-text-weight-bold is-size-2">
            Submit a run
          </h1>
          <p class="has-text-light content">
            General information about submitting runs. Runs submitted on
            speedrun.com will both apear on
            <a :href="speedruncomURL" target="_blank">speedrun.com</a> and
            <router-link to="/">speedsouls.com</router-link>
          </p>
          <p class="has-text-light content">Some more information here.</p>
          <b-message title="Warning" type="is-warning" :closable="false">
            You will need a
            <a :href="speedruncomURL" target="_blank">speedrun.com</a> account
            to submit a run.
          </b-message>
        </div>
        <div class="column is-full">
          <h2 class="has-text-light is-full has-text-weight-bold is-size-3">
            Games
          </h2>
        </div>
        <div class="column is-full">
          <b-collapse
            class="card"
            animation="slide"
            v-for="game of games"
            :key="game.id"
            :open="isOpen == game.id"
            @open="isOpen = game.id"
          >
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
            >
              <p class="card-header-title">{{ game.name }}</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content is-unselectable">
              <categories
                :categories="game.categories"
                :showLabel="false"
                @CategoryClick="category => openSubmitPage(game, category)"
              />
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { useSoulsGames, BASE_URL } from "@/api/rx-souls";
import Categories from "@/components/Categories.vue";

export default {
  name: "submit",
  components: { Categories },
  data: () => ({
    games: undefined,
    error: null,
    speedruncomURL: BASE_URL,
    isOpen: 0
  }),
  methods: {
    onSuccess(games) {
      if (!games) return;

      this.error = null;
      this.games = games;
    },
    onError(error) {
      this.error = error;
      return of(undefined);
    },
    openSubmitPage({ weblink }, { uglyHash }) {
      window.open(`${weblink}/editrun#${uglyHash}`);
    }
  },
  mounted() {
    this.$subscribeTo(
      useSoulsGames().pipe(catchError(this.onError)),
      this.onSuccess
    );
  }
};
</script>
