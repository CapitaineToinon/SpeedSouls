<template>
  <div class="border-gray-100 rounded overflow-hidden shadow-md">
    <div class="bg-black pb-3/5 relative">
      <img
        class="absolute h-full w-full object-cover opacity-75"
        :src="src"
        alt="Sunset in the mountains"
      />
      <div
        class="absolute h-full w-full flex items-center justify-center text-center p-2"
      >
        <div class="text-gray-100 font-bold">
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
      required: true
    }
  },
  computed: {
    src() {
      return `/img/backgrounds/${this.game.abbreviation}-240.jpg`;
    }
  }
};
</script>
