<template>
  <div
    class="game-card card has-text-centered is-bold is-unselectable"
    :class="{ clickable }"
    :style="style"
    @click="onClick"
  >
    <div class="card-image">
      <figure class="image is-16by9"></figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    },
    to: {
      type: Object,
      required: false
    }
  },
  methods: {
    onClick() {
      if (this.to) this.$router.push(this.to);
    }
  },
  computed: {
    clickable() {
      return this.to !== undefined;
    },
    style() {
      return {
        "--bg-url": `url(${this.game.assets["background"].uri})`,
        "--game-name": `"${this.game.names.international}"`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  position: relative;

  &.clickable {
    cursor: pointer;
  }

  .card-image {
    overflow: hidden;

    &::after {
      content: var(--game-name);
      position: absolute;
      font-weight: bold;
      font-size: 1rem;
      color: white;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .image {
      display: flex;
      position: relative;
      background-image: var(--bg-url);
      background-size: cover;
      background-position: center;
      filter: blur(1px);
      transform: scale(1);
      transition: all 200ms;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba($color: $black, $alpha: 0.4);
      }
    }
  }
}
</style>
