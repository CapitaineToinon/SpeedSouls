<template>
  <div class="overflow-hidden rounded border-gray-100 shadow-md">
    <div class="relative bg-black pb-3/5">
      <img
        class="absolute h-full w-full object-cover opacity-75"
        :src="src"
        alt="Sunset in the mountains"
      />
      <div
        class="absolute flex h-full w-full items-center justify-center p-2 text-center"
      >
        <div class="font-bold text-gray-100">
          {{ game.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  computed: {
    src() {
      return `/img/backgrounds/${this.game.abbreviation}-240.jpg`;
    },
  },
};
</script>
