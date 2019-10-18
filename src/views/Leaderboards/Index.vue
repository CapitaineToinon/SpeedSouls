<template>
  <div id="leaderboards">
    <navbar />
    <keep-alive :include="cachedRouted">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  data: () => ({
    cachedRouted: ["games"]
  })
};
</script>

<style scoped>
#leaderboards {
  display: inherit;
  flex-direction: inherit;
  flex-grow: 1;
}
</style>
