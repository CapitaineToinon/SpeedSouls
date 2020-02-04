<template>
  <section class="container">
    <div class="section">
      <GameCards />
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
