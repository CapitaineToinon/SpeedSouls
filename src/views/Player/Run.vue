<template>
  <div v-if="runError">
    <error :error="runError" />
  </div>
  <div v-else-if="!run">
    <div class="progress h-2 flex flex-row"></div>
  </div>
  <div v-else>
    <breadcrumbs class="pb-3" :items="breadcrumbs" />
    <div class="overflow-hidden rounded mb-4 bg-nord5 dark:bg-nord1 shadow-md">
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
        <div class="text-nord0 dark:text-nord6 text-xl">
          <router-link :to="to(run.game, run.category)">{{
            run.category.name
          }}</router-link>
          in {{ run.primary_t.time }} by
          <span class="player-names">
            <player-name
              class="player-name"
              :class="{ 'cursor-pointer': !!player.id }"
              v-for="(player, i) in run.players"
              :key="`player-${i}`"
              :player="player"
              @click="onPlayerClick"
            />
          </span>
        </div>
        <p class="text-nord1 dark:text-nord4 text-base">
          {{ run.date | date }}
        </p>
        <p
          v-if="run.comment"
          class="text-nord1 dark:text-nord4 text-base mt-5 italic"
        >
          {{ run.comment }}
        </p>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <by-speedrun-com class="text-center" />
    </div>
  </div>
</template>

<script>
import { of } from 'rxjs';
import { pluck, switchMap, catchError, tap } from 'rxjs/operators';
import { useRuns } from '@/api/rx-souls';
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import RunVideo from '@/components/RunVideo';
import PlayerName from '@/components/PlayerName';
import Breadcrumbs from '@/components/Breadcrumbs';
import BySpeedrunCom from '@/components/BySpeedrunCom';
import date from '@/filters/date';

export default {
  metaInfo() {
    return {
      title: this.metaTitle
    };
  },
  components: {
    Alert,
    Error,
    Breadcrumbs,
    RunVideo,
    PlayerName,
    BySpeedrunCom
  },
  data: () => ({
    run: undefined,
    runError: null
  }),
  filters: {
    date
  },
  methods: {
    to(game, category) {
      return {
        name: 'Game',
        params: {
          game: game.abbreviation,
          category: category.hash
        }
      };
    },
    onPlayerClick(player) {
      if (!player.id) return;
      this.$router.push({
        name: 'Player',
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
    metaTitle() {
      if (this.run) {
        const game = this.run.game.name;
        const category = this.run.category.name;
        const time = this.run.primary_t.time;
        const players = this.run.players.map(p => p.name).join(', ');

        return `${game} ${category} in ${time} by ${players}`;
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

      if (this.run) {
        array.push({
          text: this.run.game.name,
          to: {
            name: 'Game',
            params: {
              game: this.run.game.abbreviation
            }
          },
          active: false
        });

        array.push({
          text: this.run.category.name,
          to: {
            name: 'Game',
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
            .join(', ')}`,
          to: {},
          active: true
        });
      }

      return array;
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable('$route.params.id', { immediate: true }).pipe(
        pluck('newValue'),
        tap(() => (this.runError = null)),
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
    content: ',';
    @apply mr-2;
  }
}
</style>
