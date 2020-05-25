<template>
  <div class="container">
    <div class="title w-full">
      <h1
        class="font-black text-4xl text-bold leading-none mb-4 text-nord0 dark:text-nord6"
      >
        Leaderboards
      </h1>
    </div>
    <game-cards />
  </div>
</template>

<script>
import GameCards from '@/components/GameCards';

export default {
  metaInfo: {
    title: 'Leaderboards'
  },
  components: { GameCards }
};
</script>
