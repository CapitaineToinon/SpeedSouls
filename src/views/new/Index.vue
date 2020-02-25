<template>
  <div class="has-fixed-navbar-top">
    <router-view></router-view>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import status from "@/mixins/status";
import { prepareGetGames } from "@/api/speedsouls";

const [getGames, cancel] = prepareGetGames();

export default {
  name: "games",
  mixins: [status],
  components: { GameCard },
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
    console.log("once");
    this.fetchData();
  }
  // unmounted: cancel,
  // destroyed: cancel
};
</script>
