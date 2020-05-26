<template>
  <div v-if="pbsError">
    <error :error="pbsError" />
  </div>
  <div v-else-if="!pbs">
    <div class="progress h-2 flex flex-row"></div>
  </div>
  <div v-else>
    <alert v-if="pbs.length === 0" type="info" class="w-full mb-6"
      >The are no runs.</alert
    >
    <div
      v-for="(group, i) in pbs"
      :key="i"
      class="flex flex-col w-full justify-center mb-4"
    >
      <breadcrumbs
        class="pb-3"
        :items="[
          {
            text: 'Leaderboards',
            to: { name: 'Games' }
          },
          {
            text: group.game.name,
            to: {
              name: 'Game',
              params: {
                game: group.game.abbreviation
              }
            }
          }
        ]"
      />

      <div class="responsive-table rounded-none">
        <table class="text-center rounded-none">
          <thead>
            <tr>
              <th class="shrink">Rank</th>
              <th class="expand">Category</th>
              <th class="shrink">Time</th>
              <th class="shrink">Date</th>
              <th class="shrink hidden lg:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in group.runs"
              :key="row.id"
              @click="onRowClick(row)"
            >
              <td class="shrink" data-label="Rank">{{ row.place }}</td>
              <td class="expand" data-label="Category">
                {{ row.category.name }}
              </td>
              <td class="shrink" data-label="Time">{{ row.primary_t.time }}</td>

              <td class="shrink" data-label="Date">
                {{ row.date | relativeDate }} ago
              </td>
              <td class="shrink hidden lg:table-cell">
                <font-awesome-icon
                  v-if="row.showicon"
                  :icon="['fas', 'video']"
                />
                <font-awesome-icon
                  v-else
                  class="text-nord11"
                  :icon="['fas', 'video-slash']"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <by-speedrun-com class="my-4 text-center" />
    </div>
  </div>
</template>

<script>
import { of } from 'rxjs';
import { skipWhile, pluck, switchMap, catchError } from 'rxjs/operators';
import { useUserPersonalBests, useUser } from '@/api/rx-souls';
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import Breadcrumbs from '@/components/Breadcrumbs';
import BySpeedrunCom from '@/components/BySpeedrunCom';
import relativeDate from '@/filters/relativeDate';

export default {
  metaInfo() {
    return {
      title: this.metaTitle
    };
  },
  components: { Alert, Error, Breadcrumbs, BySpeedrunCom },
  data: () => ({
    player: undefined,
    playerError: null,
    pbs: undefined,
    pbsError: null
  }),
  computed: {
    metaTitle() {
      if (this.player) {
        return this.player.name;
      }

      return undefined;
    }
  },
  filters: {
    relativeDate
  },
  methods: {
    onPlayerSuccess(player) {
      this.player = player;
    },
    onPlayerError(error) {
      this.playerError = error;
      return of(undefined);
    },
    onPbsSuccess(pbs) {
      this.pbs = pbs;
    },
    onPbsError(error) {
      this.pbsError = error;
      return of(undefined);
    },
    onRowClick(row) {
      this.$router.push({
        name: 'Run',
        params: {
          id: row.id
        }
      });
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable('$route.params.id', { immediate: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        switchMap(() =>
          useUser(this.$route.params.id).pipe(catchError(this.onPlayerError))
        )
      ),
      this.onPlayerSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable('$route.params.id', { immediate: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        switchMap(() =>
          useUserPersonalBests(this.$route.params.id).pipe(
            catchError(this.onPbsError)
          )
        )
      ),
      this.onPbsSuccess
    );
  }
};
</script>
