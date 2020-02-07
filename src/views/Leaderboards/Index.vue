<template>
  <div class="leaderboards">
    <main class="ss-main">
      <keep-alive include="games">
        <router-view />
      </keep-alive>
    </main>
    <ss-footer class="ss-footer" />
  </div>
</template>

<style scoped lang="scss">
.leaderboards {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .ss-main {
    padding-top: $navbar-height;
    flex-grow: 1;
  }
}
</style>
