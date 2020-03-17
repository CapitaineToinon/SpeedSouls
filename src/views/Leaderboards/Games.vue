<template>
  <section class="container">
    <div class="section">
      <div class="columns is-mobile is-multiline">
        <div class="column is-full">
          <h1 class="has-text-light is-full has-text-weight-bold is-size-2">
            Leaderboards
          </h1>
        </div>
        <div class="column is-full">
          <GameCards />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GameCards from "@/components/GameCards.vue";

export default {
  name: "games",
  components: { GameCards }
};
</script>
