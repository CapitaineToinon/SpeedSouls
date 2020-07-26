<template>
  <div v-if="playerError" class="container flex flex-col lg:flex-row flex-wrap">
    <error class="w-full mb-4" :error="playerError" />
  </div>
  <div v-else class="container flex flex-col lg:flex-row flex-wrap">
    <aside
      v-if="players"
      class="w-full mb-5 gap-4 md:mb-0 lg:w-64"
      :class="{ 'order-2 lg:order-1': isRunPage }"
    >
      <player-card
        class="mb-4"
        v-for="(p, i) in players"
        :class="{ sticky: $route.name === 'Player' }"
        :key="i"
        :player="p"
        :showbutton="!isPlayerPage"
      />
    </aside>
    <router-view
      class="w-full md:flex-1 ml-0 lg:ml-5 mb-4 lg:mb-0"
      :class="{ 'order-1 lg:order-2': isRunPage }"
    />
  </div>
</template>

<script>
import { of, iif } from 'rxjs';
import { skipWhile, pluck, switchMap, catchError, tap } from 'rxjs/operators';
import { useUser, useRuns } from '@/api/rx-souls';
import Error from '@/components/Error';
import PlayerCard from '@/components/PlayerCard';

export default {
  components: { Error, PlayerCard },
  data: () => ({
    players: undefined,
    playerError: null
  }),
  computed: {
    isRunPage() {
      return this.$route.name === 'Run';
    },
    isPlayerPage() {
      return this.$route.name === 'Player';
    }
  },
  methods: {
    onPlayersSuccess(players) {
      this.players = players;
    },
    onPlayersError(error) {
      this.playerError = error;
      return of(undefined);
    },
    /**
     * Get the player(s) from the run id
     */
    getFromRun() {
      return useRuns(this.$route.params.id).pipe(
        switchMap(run => of(run.players))
      );
    },
    /**
     * Get the current player from the player id
     * but format it as an array
     */
    getFromUser() {
      return useUser(this.$route.params.id).pipe(
        switchMap(player => of([player]))
      );
    }
  },
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable('$route.params.id', { immediate: true }).pipe(
        pluck('newValue'),
        skipWhile(v => v === undefined),
        tap(() => (this.playerError = null)),
        switchMap(() =>
          iif(() => this.isRunPage, this.getFromRun(), this.getFromUser()).pipe(
            catchError(this.onPlayersError)
          )
        )
      ),
      this.onPlayersSuccess
    );
  }
};
</script>

<style lang="scss" scoped>
aside {
  .sticky {
    top: calc(var(--navbar-height) + 1.5rem);
  }
}
</style>
