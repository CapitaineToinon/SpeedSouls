<template>
  <div v-if="playerError" class="container">
    <error :error="playerError" />
  </div>
  <div v-else-if="!player" class="container">
    <spinner />
  </div>
  <div v-else class="container flex flex-row flex-wrap">
    <aside class="w-full mb-5 md:mb-0 md:w-64 md:flex-none relative">
      <player-card class="player" :player="player" :showbutton="false" />
    </aside>
    <div v-if="pbsError" class="w-full md:flex-1 ml-0 md:ml-5">
      <error :error="pbsError" />
    </div>
    <div v-else-if="!pbs" class="w-full md:flex-1 ml-0 md:ml-5">
      <spinner />
    </div>
    <div
      v-else
      class="w-full flex flex-col items-center md:flex-1 ml-0 md:ml-5"
    >
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
                <td class="shrink" data-label="Times">
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

      <a
        :href="player.weblink"
        target="_blank"
        class="w-auto bg-nord10 text-white font-bold py-2 px-4 border-b-4 border-nord9 rounded"
        >View Profile on Speedrun.com</a
      >
    </div>
  </div>
</template>

<script>
import { of } from "rxjs";
import { skipWhile, pluck, switchMap, catchError } from "rxjs/operators";
import { useUser, useUserPersonalBests } from "@/api/rx-souls";
import Alert from "@/components/Alert";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import PlayerCard from "@/components/PlayerCard";

export default {
  components: { Alert, Error, Spinner, PlayerCard },
  data: () => ({
    player: undefined,
    playerError: null,
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
        name: "Run",
        params: {
          id: row.id
        }
      });
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("$route.params.id", { immediate: true }).pipe(
        pluck("newValue"),
        skipWhile(v => v === undefined),
        switchMap(() =>
          useUser(this.$route.params.id).pipe(catchError(this.onPlayerError))
        )
      ),
      this.onPlayerSuccess
    );

    this.$subscribeTo(
      this.$watchAsObservable("$route.params.id", { immediate: true }).pipe(
        pluck("newValue"),
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

<style lang="scss" scoped>
.player {
  @apply sticky;
  top: calc(var(--navbar-height) + 1.5rem);
}
</style>
