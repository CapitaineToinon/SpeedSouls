<template>
  <div v-if="runError" class="container">
    <error :error="runError" />
  </div>
  <div v-else-if="!run" class="container">
    <spinner />
  </div>
  <div v-else class="container flex flex-row flex-wrap">
    <aside class="w-full order-2 md:order-1 md:w-64 md:flex-none">
      <player-card
        v-for="(player, i) in run.players"
        :key="`player-card-${i}`"
        class="player"
        :player="player"
      />
    </aside>
    <div class="w-full order-1 mb-5 md:mb-0 md:order-2 md:flex-1 ml-0 md:ml-5">
      <breadcrumbs class="pb-3" :items="breadcrumbs" />
      <div class="overflow-hidden rounded bg-nord5 dark:bg-nord1 shadow-lg">
        <div v-if="run && run.videos && run.videos.links" class="w-full">
          <run-video
            v-for="(link, i) in run.videos.links"
            :key="i"
            :url="link.uri"
          ></run-video>
        </div>
        <div v-else class="p-4">
          <alert type="warning">No video.</alert>
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-nord0 dark:text-nord6 text-xl">
            <router-link :to="to(run.game, run.category)">
              {{ run.category.name }}
            </router-link>
            in {{ run.primary_t.time }} by
            <span class="player-names">
              <player-name
                class="player-name cursor-pointer"
                v-for="(player, i) in run.players"
                :key="`player-${i}`"
                :player="player"
                @click="onPlayerClick"
              />
            </span>
          </div>
          <p class="text-nord1 dark:text-nord4 text-base">{{ date }}</p>
          <p
            v-if="run.comment"
            class="text-nord1 dark:text-nord4 text-base mt-5 italic"
          >
            {{ run.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { pluck, switchMap, catchError } from "rxjs/operators";
import { useRuns } from "@/api/rx-souls";
import Alert from "@/components/Alert";
import Error from "@/components/Error";
import RunVideo from "@/components/RunVideo";
import Spinner from "@/components/Spinner";
import PlayerName from "@/components/PlayerName";
import PlayerCard from "@/components/PlayerCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import formatDate from "date-fns/format";

export default {
  components: {
    Alert,
    Error,
    Breadcrumbs,
    RunVideo,
    Spinner,
    PlayerName,
    PlayerCard
  },
  data: () => ({
    run: undefined,
    runError: null
  }),
  methods: {
    to(game, category) {
      return {
        name: "Game",
        params: {
          game: game.abbreviation,
          category: category.hash
        }
      };
    },
    onPlayerClick(player) {
      this.$router.push({
        name: "Player",
        params: {
          id: player.name
        }
      });
    },
    onRunSuccess(run) {
      this.run = run;
    },
    onRunError(error) {
      this.runError = error;
      return of(undefined);
    }
  },
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
          to: { name: "Games" }
        }
      ];

      if (this.run) {
        array.push({
          text: this.run.game.name,
          to: {
            name: "Game",
            params: {
              game: this.run.game.abbreviation
            }
          },
          active: false
        });

        array.push({
          text: this.run.category.name,
          to: {
            name: "Game",
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

      return array;
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("$route.params.id", { immediate: true }).pipe(
        pluck("newValue"),
        switchMap(id => useRuns(id).pipe(catchError(this.onRunError)))
      ),
      this.onRunSuccess
    );
  }
};
</script>

<style lang="scss" scoped>
.player:not(:last-child) {
  @apply mb-4;
}

.player-names {
  .player-name:not(:first-child)::before {
    content: ",";
    @apply mr-2;
  }
}
</style>
