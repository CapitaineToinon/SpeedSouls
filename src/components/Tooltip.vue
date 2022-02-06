<template>
  <div class="tooltip">
    <slot />
    <span v-if="text" class="tooltiptext">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
/* Tooltip container */
.tooltip {
  @apply relative;
  @apply inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  @apply bg-nord0;
  @apply text-nord6;
  @apply py-1;
  @apply px-2;
  @apply rounded;
  @apply whitespace-nowrap;
  visibility: hidden;

  text-align: center;

  /* Position the tooltip text */
  position: absolute;
  @apply absolute;
  @apply z-10;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);

  /* Fade in tooltip */
  @apply opacity-0;
  transition: opacity 0.2s ease-in-out;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  // content: '';
  // position: absolute;
  // top: 100%;
  // left: 50%;
  // margin-left: -5px;
  // border-width: 5px;
  // border-style: solid;
  // @apply border-t;
  // @apply border-nord0;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  @apply visible;
  @apply opacity-100;
}
</style>
