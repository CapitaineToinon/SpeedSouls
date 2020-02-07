<template>
  <div class="leaderboards">
    <main class="ss-main">
      <keep-alive include="games">
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.leaderboards {
  flex-grow: 1;
}
</style>
