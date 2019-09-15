<template>
  <div id="leaderboards">
    <keep-alive :include="cachedRouted">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
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
