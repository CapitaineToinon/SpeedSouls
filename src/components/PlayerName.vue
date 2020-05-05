<template>
  <span class="player" @click="$emit('click', player)">
    <span
      v-tooltip.top-center="player.country.name"
      v-if="player.country"
      :class="`flag-icon flag-icon-${player.country.code} mr-1`"
    />{{ player.name }}</span
  >
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  }
};
</script>
