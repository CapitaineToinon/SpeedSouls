<template>
  <div id="leaderboards">
    <navbar class="is-primary" />
    <keep-alive include="games">
      <router-view />
    </keep-alive>
  </div>
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
#leaderboards {
  display: inherit;
  flex-direction: inherit;
  flex-grow: 1;
  overflow: hidden;
}
</style>
