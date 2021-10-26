<template>
  <span class="player" @click="$emit('click', player)">
    <tooltip v-if="player.country" :text="player.country.name">
      <span
        :class="`flag-icon flag-icon-${player.country.code} mr-1`"
      /> </tooltip
    >{{ player.name }}
  </span>
</template>

<script>
import Tooltip from '@/components/Tooltip.vue';

export default {
  components: { Tooltip },
  props: {
    player: {
      type: Object,
      required: true
    }
  }
};
</script>
