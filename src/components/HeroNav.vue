<template>
  <section class="hero">
    <div class="hero-head">
      <Navbar />
    </div>
    <div class="hero-body">
      <slot />
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style scoped lang="scss">
.hero {
  background-image: url("~@/assets/thumb-ds3.jpg");
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
</style>
