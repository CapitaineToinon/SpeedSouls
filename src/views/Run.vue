<template>
  <div v-if="runError" class="rejected container has-fixed-navbar-top">
    <div class="section">
      <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        :closable="false"
        >{{ runError.message }}</b-message
      >
    </div>
  </div>
  <div v-else-if="!run" class="pending container has-fixed-navbar-top">
    <div class="section">
      <ss-loading :active="true" />
    </div>
  </div>
  <div v-else class="fulfilled container has-fixed-navbar-top">
    <div class="section">
      <div class="columns is-mobile is-multiline">
        <div class="column is-full-mobile left is-narrow">
          <div class="card aside">
            <div class="card-image">
              <figure class="image">
                <img :src="run.game.coverLarge" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title has-text-light is-4">{{ run.game.name }}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                :to="{ name: 'game', params: { game: run.game.abbreviation } }"
                class="card-footer-item"
                >Leaderboards</router-link
              >
              <a :href="`${run.game.weblink}/editrun`" class="card-footer-item"
                >Submit a run</a
              >
            </footer>
          </div>
        </div>
        <div class="column is-full-mobile right">
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
          <div class="card">
            <div class="card-image">
              <div v-if="run && run.videos && run.videos.links">
                <run-video
                  v-for="(link, i) in run.videos.links"
                  :key="i"
                  :url="link.uri"
                ></run-video>
              </div>
              <div v-else class="section">
                <b-message title="Warning" type="is-warning" :closable="false"
                  >No videos.</b-message
                >
              </div>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title has-text-light is-4">
                    <router-link
                      :to="{
                        name: 'game',
                        params: {
                          game: run.game.abbreviation,
                          category: run.category.hash
                        }
                      }"
                      >{{ run.category.name }}</router-link
                    >
                    in {{ run.primary_t.time }} by
                    <span
                      class="player"
                      v-for="(player, i) in run.players"
                      :key="`player-${i}`"
                    >
                      <b-tooltip
                        v-if="player.country"
                        :label="player.country.name"
                        animated
                      >
                        <span
                          :class="`flag-icon flag-icon-${player.country.code}`"
                        ></span>
                      </b-tooltip>
                      {{ player.name }}
                    </span>
                  </p>
                  <p class="subtitle has-text-light is-6">{{ date }}</p>
                </div>
              </div>

              <div v-if="run.comment" class="content">
                {{ run.comment }}
                <!-- <a>@bulmaio</a>.
                <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>-->
              </div>
            </div>
            <footer class="card-footer">
              <a :href="`${run.weblink}/editrun`" class="card-footer-item"
                >View on speedrun.com</a
              >
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { pluck, switchMap, catchError } from "rxjs/operators";
import { useRuns } from "@/api/rx-souls";
import RunVideo from "@/components/RunVideo";
import formatDate from "date-fns/format";

export default {
  data: () => ({
    run: undefined,
    runError: null
  }),
  components: { RunVideo },
  computed: {
    date() {
      let date = "";

      if (this.run) {
        date = formatDate(new Date(this.run.date), "do MMM yyyy");
      }

      return date;
    },
    breadcrumbs() {
      const array = [
        {
          text: "Leaderboards",
          to: { name: "games" }
        }
      ];

      if (this.run) {
        array.push({
          text: this.run.game.name,
          to: {
            name: "game",
            params: {
              game: this.run.game.abbreviation
            }
          },
          active: false
        });

        array.push({
          text: this.run.category.name,
          to: {
            name: "game",
            params: {
              game: this.run.game.abbreviation,
              category: this.run.category.hash
            }
          },
          active: false
        });

        array.push({
          text: `${this.run.primary_t.time} by ${this.run.players
            .map(p => p.name)
            .join(", ")}`,
          to: {},
          active: true
        });
      }

      console.log(this.run);

      return array;
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("$route.params.id", { immediate: true }).pipe(
        pluck("newValue"),
        switchMap(id =>
          useRuns(id).pipe(
            catchError(error => {
              this.runError = error;
              return of(undefined);
            })
          )
        )
      ),
      run => (this.run = run)
    );
  }
};
</script>

<style lang="scss" scoped>
.fulfilled {
  .column {
    &.left {
      order: 1;
      width: $sidebar-width;

      @include mobile {
        order: 2;
        width: 100%;
      }
    }

    &.right {
      order: 2;

      @include mobile {
        order: 1;
      }
    }
  }

  .header {
    margin-bottom: $size-4;
  }
}
</style>
