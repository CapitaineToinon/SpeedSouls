<template>
  <div class="container">
    <div class="title w-full">
      <h1 class="font-black text-4xl text-bold text-nord0 dark:text-nord6">
        Leaderboards
      </h1>
    </div>
    <game-cards />
  </div>
</template>

<script>
import GameCards from '@/components/GameCards';

export default {
  components: { GameCards }
};
</script>
