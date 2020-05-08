<template>
  <div v-if="pbsError">
    <error :error="pbsError" />
  </div>
  <div v-else-if="!pbs">
    <spinner />
  </div>
  <div v-else>
    <alert v-if="pbs.length === 0" type="info" class="w-full mb-6"
      >The are no runs.</alert
    >
    <div
      v-for="(group, i) in pbs"
      :key="i"
      class="flex flex-col w-full justify-center mb-6"
    >
      <router-link
        :to="{ name: 'Game', params: { game: group.game.abbreviation } }"
        class="w-full text-nord0 dark:text-nord6 w-full mb-3 text-2xl"
        >{{ group.game.name }}</router-link
      >

      <div class="responsive-table">
        <table class="text-center">
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
              <td class="shrink" data-label="Time">
                {{ row.primary_t.time }}
              </td>

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
  </div>
</template>

<script>
import { of } from 'rxjs';
import { skipWhile, pluck, switchMap, catchError } from 'rxjs/operators';
import { useUserPersonalBests } from '@/api/rx-souls';
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import Spinner from '@/components/Spinner';

export default {
  components: { Alert, Error, Spinner },
  data: () => ({
    pbs: undefined,
    pbsError: null
  }),
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
