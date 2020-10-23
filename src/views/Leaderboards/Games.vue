<template>
  <div>
    <div class="title w-full">
      <h1
        class="text-4xl font-bold leading-none mb-4 text-nord0 dark:text-nord6"
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
