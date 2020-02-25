<template>
  <div>
    <ul>
      <li :key="game.id" v-for="game in games">
        <router-link :to="`/new/${game.abbreviation}`">{{ game.names.international }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import status from "@/mixins/status";
import { prepareGetGames } from "@/api/speedsouls";

const [getGames, cancel] = prepareGetGames();

export default {
  name: "games",
  mixins: [status],
  data: () => ({
    games: []
  }),
  methods: {
    async fetchData() {
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        this.games = await getGames();
        this.status.fulfilled = true;
      } catch (e) {
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    }
  },
  mounted() {
    this.fetchData();
  },
  unmounted: cancel,
  destroyed: cancel
};
</script>